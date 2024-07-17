import Footer from "../components/Footer";
import Header from "../components/Header";
import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* <AuthProvider> */}
      <Header />
      {children}
      {/* <GlobalLoader /> */}
      {/* </AuthProvider> */}
      <Footer />
    </main>
  );
}
