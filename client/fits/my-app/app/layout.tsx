import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { SoundProvider } from "@/components/providers/SoundProvider";
import { Footer, Header } from "@/components";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fits",
  description: "Fits a platform for computer accessories and peripherals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-accent antialiased`}>
        <ReactQueryProvider>
          <CartProvider>
            <SoundProvider>
              <Header />
              {children}
              <Footer />
            </SoundProvider>
          </CartProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
