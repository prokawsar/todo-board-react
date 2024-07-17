import GlobalLoader from "../components/GlobalLoader";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReactNode } from "react";
import { Toaster } from "sonner";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* <AuthProvider> */}
      <Toaster richColors position="top-right" />
      <Header />
      {children}
      <GlobalLoader />
      {/* </AuthProvider> */}
      <Footer />
    </main>
  );
}
