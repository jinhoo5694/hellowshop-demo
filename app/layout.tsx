import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HellowShop - 애니메이션 & 코스프레 전문 쇼핑몰",
  description: "최고의 품질, 합리적인 가격의 코스튬, 위그, 소품을 만나보세요. 원신, 귀멸의 칼날, 블루아카이브 등 인기 애니메이션 코스프레 의상 전문점.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0`}
      >
        <Providers>
          <Header />
          <main className="m-0 p-0">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
