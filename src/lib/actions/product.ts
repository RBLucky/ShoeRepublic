"use server";

import {
  and,
  asc,
  count,
  desc,
  eq,
  ilike,
  inArray,
  isNull,
  or,
  sql,
  type SQL,
} from "drizzle-orm";
import { db } from "@/lib/db";
import {
  brands,
  categories,
  genders,
  productImages,
  productVariants,
  products,
  sizes,
  colors,
  users,
  reviews,
  type SelectProduct,
  type SelectVariant,
  type SelectProductImage,
  type SelectBrand,
  type SelectCategory,
  type SelectGender,
  type SelectColor,
  type SelectSize,
} from "@/lib/db/schema";

import { NormalizedProductFilters } from "@/lib/utils/query";

type ProductListItem = {
  id: string;
  name: string;
  imageUrl: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  createdAt: Date;
  subtitle?: string | null;
};

export type GetAllProductsResult = {
  products: ProductListItem[];
  totalCount: number;
};

export async function getAllProducts(
  filters: NormalizedProductFilters
): Promise<GetAllProductsResult> {
  const page = Math.max(1, filters.page);
  const limit = Math.max(1, Math.min(filters.limit, 60));
  const offset = (page - 1) * limit;

  // Define a reusable query builder
  const queryBuilder = db
    .select({
      id: products.id,
      name: products.name,
      imageUrl: productImages.url,
      minPrice: sql<number>`min(${productVariants.price})`.as("min_price"),
      maxPrice: sql<number>`max(${productVariants.price})`.as("max_price"),
      createdAt: products.createdAt,
      subtitle: genders.label,
    })
    .from(products)
    .leftJoin(productVariants, eq(products.id, productVariants.productId))
    .leftJoin(genders, eq(products.genderId, genders.id))
    .leftJoin(productImages, eq(products.id, productImages.productId))
    .where(and(eq(products.isPublished, true), isNull(productImages.variantId)))
    .groupBy(products.id, productImages.url, genders.label);

  // Determine the ordering
  let orderByClause;
  switch (filters.sort) {
    case "price_asc":
      orderByClause = asc(sql`min(${productVariants.price})`);
      break;
    case "price_desc":
      orderByClause = desc(sql`max(${productVariants.price})`);
      break;
    default:
      orderByClause = desc(products.createdAt);
  }

  // Apply ordering and pagination to the query
  const allProductsQuery = queryBuilder
    .orderBy(orderByClause)
    .limit(limit)
    .offset(offset);

  const allProducts = await allProductsQuery;

  // For total count, we don't need ordering or pagination
  const totalCountQuery = db
    .select({ count: count() })
    .from(products)
    .where(eq(products.isPublished, true));

  const totalCountResult = await totalCountQuery;
  const totalCount = totalCountResult[0]?.count ?? 0;

  return {
    products: allProducts.map((p) => ({
      ...p,
      minPrice: p.minPrice ? Number(p.minPrice) : null,
      maxPrice: p.maxPrice ? Number(p.maxPrice) : null,
    })),
    totalCount,
  };
}


export type FullProduct = {
  product: SelectProduct & {
    brand?: SelectBrand | null;
    category?: SelectCategory | null;
    gender?: SelectGender | null;
  };
  variants: Array<
    SelectVariant & {
      color?: SelectColor | null;
      size?: SelectSize | null;
    }
  >;
  images: SelectProductImage[];
};

export async function getProduct(
  productId: string
): Promise<FullProduct | null> {
  const rows = await db
    .select({
      productId: products.id,
      productName: products.name,
      productDescription: products.description,
      productBrandId: products.brandId,
      productCategoryId: products.categoryId,
      productGenderId: products.genderId,
      isPublished: products.isPublished,
      defaultVariantId: products.defaultVariantId,
      productCreatedAt: products.createdAt,
      productUpdatedAt: products.updatedAt,

      brandId: brands.id,
      brandName: brands.name,
      brandSlug: brands.slug,
      brandLogoUrl: brands.logoUrl,

      categoryId: categories.id,
      categoryName: categories.name,
      categorySlug: categories.slug,

      genderId: genders.id,
      genderLabel: genders.label,
      genderSlug: genders.slug,

      variantId: productVariants.id,
      variantSku: productVariants.sku,
      variantPrice: sql<number | null>`${productVariants.price}::numeric`,
      variantSalePrice: sql<
        number | null
      >`${productVariants.salePrice}::numeric`,
      variantColorId: productVariants.colorId,
      variantSizeId: productVariants.sizeId,
      variantInStock: productVariants.inStock,

      colorId: colors.id,
      colorName: colors.name,
      colorSlug: colors.slug,
      colorHex: colors.hexCode,

      sizeId: sizes.id,
      sizeName: sizes.name,
      sizeSlug: sizes.slug,
      sizeSortOrder: sizes.sortOrder,

      imageId: productImages.id,
      imageUrl: productImages.url,
      imageIsPrimary: productImages.isPrimary,
      imageSortOrder: productImages.sortOrder,
      imageVariantId: productImages.variantId,
    })
    .from(products)
    .leftJoin(brands, eq(brands.id, products.brandId))
    .leftJoin(categories, eq(categories.id, products.categoryId))
    .leftJoin(genders, eq(genders.id, products.genderId))
    .leftJoin(productVariants, eq(productVariants.productId, products.id))
    .leftJoin(colors, eq(colors.id, productVariants.colorId))
    .leftJoin(sizes, eq(sizes.id, productVariants.sizeId))
    .leftJoin(productImages, eq(productImages.productId, products.id))
    .where(eq(products.id, productId));

  if (!rows.length) return null;

  const head = rows[0];

  const product: SelectProduct & {
    brand?: SelectBrand | null;
    category?: SelectCategory | null;
    gender?: SelectGender | null;
  } = {
    id: head.productId,
    name: head.productName,
    description: head.productDescription,
    brandId: head.productBrandId ?? null,
    categoryId: head.productCategoryId ?? null,
    genderId: head.productGenderId ?? null,
    isPublished: head.isPublished,
    defaultVariantId: head.defaultVariantId ?? null,
    createdAt: head.productCreatedAt,
    updatedAt: head.productUpdatedAt,
    brand: head.brandId
      ? {
          id: head.brandId,
          name: head.brandName!,
          slug: head.brandSlug!,
          logoUrl: head.brandLogoUrl ?? null,
        }
      : null,
    category: head.categoryId
      ? {
          id: head.categoryId,
          name: head.categoryName!,
          slug: head.categorySlug!,
          parentId: null,
        }
      : null,
    gender: head.genderId
      ? {
          id: head.genderId,
          label: head.genderLabel!,
          slug: head.genderSlug!,
        }
      : null,
  };

  const variantsMap = new Map<string, FullProduct["variants"][number]>();
  const imagesMap = new Map<string, SelectProductImage>();

  for (const r of rows) {
    if (r.variantId && !variantsMap.has(r.variantId)) {
      variantsMap.set(r.variantId, {
        id: r.variantId,
        productId: head.productId,
        sku: r.variantSku!,
        price: r.variantPrice !== null ? String(r.variantPrice) : "0",
        salePrice:
          r.variantSalePrice !== null ? String(r.variantSalePrice) : null,
        colorId: r.variantColorId!,
        sizeId: r.variantSizeId!,
        inStock: r.variantInStock!,
        weight: null,
        dimensions: null,
        createdAt: head.productCreatedAt,
        color: r.colorId
          ? {
              id: r.colorId,
              name: r.colorName!,
              slug: r.colorSlug!,
              hexCode: r.colorHex!,
            }
          : null,
        size: r.sizeId
          ? {
              id: r.sizeId,
              name: r.sizeName!,
              slug: r.sizeSlug!,
              sortOrder: r.sizeSortOrder!,
            }
          : null,
      });
    }
    if (r.imageId && !imagesMap.has(r.imageId)) {
      imagesMap.set(r.imageId, {
        id: r.imageId,
        productId: head.productId,
        variantId: r.imageVariantId ?? null,
        url: r.imageUrl!,
        sortOrder: r.imageSortOrder ?? 0,
        isPrimary: r.imageIsPrimary ?? false,
      });
    }
  }

  return {
    product,
    variants: Array.from(variantsMap.values()),
    images: Array.from(imagesMap.values()),
  };
}
export type Review = {
  id: string;
  author: string;
  rating: number;
  title?: string;
  content: string;
  createdAt: string;
};

export type RecommendedProduct = {
  id: string;
  title: string;
  price: number | null;
  imageUrl: string;
};

export async function getProductReviews(productId: string): Promise<Review[]> {
  const rows = await db
    .select({
      id: reviews.id,
      rating: reviews.rating,
      comment: reviews.comment,
      createdAt: reviews.createdAt,
      authorName: users.name,
      authorEmail: users.email,
    })
    .from(reviews)
    .innerJoin(users, eq(users.id, reviews.userId))
    .where(eq(reviews.productId, productId))
    .orderBy(desc(reviews.createdAt))
    .limit(10);

  return rows.map((r) => ({
    id: r.id,
    author: r.authorName?.trim() || r.authorEmail || "Anonymous",
    rating: r.rating,
    title: undefined,
    content: r.comment || "",
    createdAt: r.createdAt.toISOString(),
  }));
}

export async function getRecommendedProducts(
  productId: string
): Promise<RecommendedProduct[]> {
  const base = await db
    .select({
      id: products.id,
      categoryId: products.categoryId,
      brandId: products.brandId,
      genderId: products.genderId,
    })
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!base.length) return [];
  const b = base[0];

  const v = db
    .select({
      productId: productVariants.productId,
      price: sql<number>`${productVariants.price}::numeric`.as("price"),
    })
    .from(productVariants)
    .as("v");

  const pi = db
    .select({
      productId: productImages.productId,
      url: productImages.url,
      rn: sql<number>`row_number() over (partition by ${productImages.productId} order by ${productImages.isPrimary} desc, ${productImages.sortOrder} asc)`.as(
        "rn"
      ),
    })
    .from(productImages)
    .as("pi");

  const priority = sql<number>`
    (case when ${products.categoryId} is not null and ${products.categoryId} = ${b.categoryId} then 1 else 0 end) * 3 +
    (case when ${products.brandId} is not null and ${products.brandId} = ${b.brandId} then 1 else 0 end) * 2 +
    (case when ${products.genderId} is not null and ${products.genderId} = ${b.genderId} then 1 else 0 end) * 1
  `;

  const rows = await db
    .select({
      id: products.id,
      title: products.name,
      minPrice: sql<number | null>`min(${v.price})`,
      imageUrl: sql<
        string | null
      >`max(case when ${pi.rn} = 1 then ${pi.url} else null end)`,
      createdAt: products.createdAt,
    })
    .from(products)
    .leftJoin(v, eq(v.productId, products.id))
    .leftJoin(pi, eq(pi.productId, products.id))
    .where(
      and(eq(products.isPublished, true), sql`${products.id} <> ${productId}`)
    )
    .groupBy(products.id, products.name, products.createdAt)
    .orderBy(desc(priority), desc(products.createdAt), asc(products.id))
    .limit(8);

  const out: RecommendedProduct[] = [];
  for (const r of rows) {
    const img = r.imageUrl?.trim();
    if (!img) continue;
    out.push({
      id: r.id,
      title: r.title,
      price: r.minPrice === null ? null : Number(r.minPrice),
      imageUrl: img,
    });
    if (out.length >= 6) break;
  }
  return out;
}

export type SearchResultProduct = {
  id: string;
  name: string;
  imageUrl: string | null;
};

export async function searchProducts(
  query: string
): Promise<SearchResultProduct[]> {
  if (!query) {
    return [];
  }

  const primaryImage = db
    .select({
      productId: productImages.productId,
      url: productImages.url,
      rn: sql<number>`row_number() over (partition by ${productImages.productId} order by ${productImages.isPrimary} desc, ${productImages.sortOrder} asc)`.as(
        "rn"
      ),
    })
    .from(productImages)
    .as("pi");

  const pattern = `%${query}%`;

  const results = await db
    .select({
      id: products.id,
      name: products.name,
      imageUrl: primaryImage.url,
    })
    .from(products)
    .where(
      and(
        eq(products.isPublished, true),
        or(ilike(products.name, pattern), ilike(products.description, pattern))
      )
    )
    .leftJoin(
      primaryImage,
      and(eq(primaryImage.productId, products.id), eq(primaryImage.rn, 1))
    )
    .limit(10);

  return results;
}