import GlobalLoader from "@/components/GlobalLoader";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <main className="flex h-[90svh] flex-col items-center">
      <Toaster richColors position="bottom-right" closeButton />
      <Header />
      {/* {children} */}
      <Outlet />
      <GlobalLoader />
      <Footer />
    </main>
  );
}
