// src/app/(root)/collections/page.tsx
import Image from "next/image";
import Link from "next/link";

// Placeholder data for collections, which can be fetched from your DB later
const collections = [
    {
        name: "New Arrivals",
        href: "/products?collection=new-arrivals",
        imageSrc: "/trending-1.png", // Using existing promotional images as placeholders
        description: "Check out the latest styles and freshest drops.",
    },
    {
        name: "Summer '25",
        href: "/products?collection=summer-25",
        imageSrc: "/trending-2.png",
        description: "Get ready for the heat with our vibrant summer collection.",
    },
    {
        name: "Running Essentials",
        href: "/products?category=running-shoes",
        imageSrc: "/feature.png",
        description: "Everything you need to hit the ground running.",
    },
];

export default function CollectionsPage() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <header className="mb-8 text-center">
                <h1 className="text-heading-2 text-dark-900">Our Collections</h1>
                <p className="mx-auto mt-2 max-w-2xl text-lead text-dark-700">
                    Explore curated collections of our best sneakers, from seasonal drops to timeless classics.
                </p>
            </header>

            <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {collections.map((collection) => (
                    <Link href={collection.href} key={collection.name} className="group block">
                        <div className="overflow-hidden rounded-xl">
                            <div className="relative aspect-video h-64 w-full">
                                <Image
                                    src={collection.imageSrc}
                                    alt={collection.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-heading-3 text-dark-900">{collection.name}</h2>
                            <p className="mt-1 text-body text-dark-700">{collection.description}</p>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}