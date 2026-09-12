import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BotonWhatsApp from "./components/BotonWhatsApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SOBRE2SIS | Banda de Rock",
  description: "Página oficial de la banda de rock SOBRE2SIS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-white relative`}>
        <Navbar />
        {children}
        <BotonWhatsApp />
        <Footer />
      </body>
    </html>
  );
}