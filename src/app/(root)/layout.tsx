import { Navbar, Footer } from "@/components";
import CartSidebar from "@/components/CartSidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <CartSidebar />
      {children}
      <Footer />
    </>
  );
}