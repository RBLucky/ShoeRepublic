// src/app/(root)/layout.tsx
"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { Navbar, Footer } from "@/components";
import CartSidebar from "@/components/CartSidebar";

// Define the routes that have a full-width hero and do NOT need top padding
const transparentNavRoutes = ["/about", "/shipping", "/faq"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const needsPadding = !transparentNavRoutes.includes(pathname);

  return (
    <>
      <Navbar />
      <CartSidebar />
      {/* The pt-16 class is now applied conditionally based on the route */}
      <main className={cn(needsPadding && "pt-16")}>
        {children}
      </main>
      <Footer />
    </>
  );
}