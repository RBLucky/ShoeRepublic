// src/components/Footer.tsx
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

// Updated column structure for a cleaner, more useful footer
const columns = {
  shop: [
    { label: "Men", href: "/products?gender=men" },
    { label: "Women", href: "/products?gender=women" },
    { label: "Kids", href: "/products?gender=unisex" },
    { label: "New Arrivals", href: "/collections" },
  ],
  information: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Returns", href: "/shipping" },
    { label: "FAQs", href: "/faq" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-light-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column: Brand and Newsletter */}
          <div className="space-y-8">
            <Image src="/logo.svg" alt="Shoe Republic" width={48} height={48} />
            <p className="max-w-xs text-body text-light-400">
              Your destination for premium, stylish, and comfortable footwear.
            </p>
            <div className="mt-6">
              <p className="text-body-medium">Stay up to date</p>
              <form className="mt-2 flex gap-2">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input name="email-address" type="email" autoComplete="email" required className="w-full rounded-md border-light-300 bg-light-100/10 px-4 py-2 text-light-100 placeholder:text-light-400 focus:ring-2 focus:ring-light-100" placeholder="Enter your email" />
                <button type="submit" className="flex-shrink-0 rounded-md bg-light-100 p-2 text-dark-900 hover:bg-light-200">
                  <span className="sr-only">Subscribe</span>
                  <Mail className="h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Columns: Shop and Information Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            <div>
              <h4 className="text-heading-3">Shop</h4>
              <ul className="mt-4 space-y-3">
                {columns.shop.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-body text-light-400 hover:text-light-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-heading-3">Information</h4>
              <ul className="mt-4 space-y-3">
                {columns.information.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-body text-light-400 hover:text-light-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 text-light-400 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-caption">
            <Image src="/globe.svg" alt="" width={16} height={16} />
            <span>South Africa</span>
            <span>© 2025 Shoe Republic, Inc. All Rights Reserved</span>
          </div>
          <div className="flex gap-4">
            {[
              { src: "/x.svg", alt: "X" },
              { src: "/facebook.svg", alt: "Facebook" },
              { src: "/instagram.svg", alt: "Instagram" },
            ].map((s) => (
              <Link key={s.alt} href="#" aria-label={s.alt} className="text-light-400 hover:text-light-100">
                <Image src={s.src} alt={s.alt} width={18} height={18} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}