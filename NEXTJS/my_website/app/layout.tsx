import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/component/Home/Navbar/responsive_nav";
import Provider from "@/component/HOC/Provider";
import Footer from "@/component/Home/Footer/Footer";
import ScrollToTop from "@/component/Helper/ScrollToTop";

const manrope = Manrope({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Delivery website",
  description: "A Food Delivery Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} antialiased`}>
        <Provider>
          <ResponsiveNav />
          {children}
          <Footer />
          <ScrollToTop />
        </Provider>
      </body>
    </html>
  );
}
