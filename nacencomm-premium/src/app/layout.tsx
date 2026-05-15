import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Nacencomm - Nền tảng chuyển đổi số toàn diện",
  description: "Cung cấp giải pháp chữ ký số, hóa đơn điện tử và an ninh mạng hàng đầu Việt Nam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${manrope.variable}`}>
      <body className="font-inter">
        {children}
      </body>
    </html>
  );
}
