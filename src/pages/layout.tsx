import GlobalLoader from "../components/GlobalLoader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-[90svh] flex-col items-center">
      <Toaster richColors position="top-right" closeButton />
      <Header />
      {children}
      <GlobalLoader />
      <Footer />
    </main>
  );
}
