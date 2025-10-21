"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import { useCartStore } from "@/store/cart";
import { SearchModal } from "@/components";
import { cn } from "@/lib/utils/cn";

// Define which routes should have a transparent navbar at the top
const transparentNavRoutes = ["/about", "/shipping", "/faq"];

export default function Navbar() {
  const pathname = usePathname(); // Get the current page's path
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { getItemCount, openCart } = useCartStore();
  const [itemCount, setItemCount] = useState(0);

  // Determine if the navbar should be transparent based on the route and scroll position
  const isTransparent = transparentNavRoutes.includes(pathname) && !hasScrolled;

  // Effect to handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setItemCount(getItemCount());
    const unsubscribe = useCartStore.subscribe(() => {
      setItemCount(getItemCount());
    });
    return () => unsubscribe();
  }, [getItemCount]);

  const NAV_LINKS = [
    { label: "Men", href: "/products?gender=men" },
    { label: "Women", href: "/products?gender=women" },
    { label: "Kids", href: "/products?gender=unisex" },
    { label: "Collections", href: "/collections" },
    { label: "Contact", href: "/contact" },
  ] as const;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          isTransparent
            ? "bg-transparent"
            : "border-b border-light-300 bg-light-100/80 shadow-sm backdrop-blur-lg"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <Link href="/" aria-label="Shoe Republic Home" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Shoe Republic"
              width={130}
              height={130}
              priority
              // Invert the logo color on dark backgrounds (transparent navbar)
              //className={cn(isTransparent ? "" : "invert")}
            />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={cn(
                    "text-body transition-colors hover:text-opacity-80",
                    isTransparent ? "text-light-100" : "text-dark-900"
                  )}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-6 md:flex">
            <button
              onClick={() => setSearchModalOpen(true)}
              className={cn(
                "text-body transition-colors hover:text-opacity-80",
                isTransparent ? "text-light-100" : "text-dark-900"
              )}
            >
              Search
            </button>
            <button
              onClick={openCart}
              className={cn(
                "text-body transition-colors hover:text-opacity-80",
                isTransparent ? "text-light-100" : "text-dark-900"
              )}
            >
              My Cart ({itemCount})
            </button>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-md p-2 md:hidden",
              isTransparent ? "text-light-100" : "text-dark-900"
            )}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className={cn("mb-1 block h-0.5 w-6", isTransparent ? "bg-light-100" : "bg-dark-900")}></span>
            <span className={cn("mb-1 block h-0.5 w-6", isTransparent ? "bg-light-100" : "bg-dark-900")}></span>
            <span className={cn("block h-0.5 w-6", isTransparent ? "bg-light-100" : "bg-dark-900")}></span>
          </button>
        </nav>

        <div
          id="mobile-menu"
          className={cn(
            "border-t border-light-300 bg-light-100 md:hidden",
            mobileMenuOpen ? "block" : "hidden"
          )}
        >
          <ul className="space-y-2 px-4 py-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block py-2 text-body text-dark-900 hover:text-dark-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center justify-between border-t border-light-300 pt-3 mt-2">
              <button
                onClick={() => { setSearchModalOpen(true); setMobileMenuOpen(false); }}
                className="text-body text-dark-900"
              >
                Search
              </button>
              <button onClick={openCart} className="text-body text-dark-900">
                My Cart ({itemCount})
              </button>
            </li>
          </ul>
        </div>
      </header>
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}