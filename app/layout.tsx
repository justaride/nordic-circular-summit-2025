import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nordic Circular Summit 2025",
  description: "Circular Frontiers: Shaping Our Future - November 19-20, 2025, Nuuk, Greenland",
  keywords: ["circular economy", "Nordic", "sustainability", "Greenland", "summit", "2025"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        style={{ background: 'linear-gradient(135deg, #f0f7f8 0%, #f4f6f2 50%, #f5f7f6 100%)' }}
      >
        {/* Global Nordic Background */}
        <div className="nordic-bg" />
        {children}
      </body>
    </html>
  );
}
