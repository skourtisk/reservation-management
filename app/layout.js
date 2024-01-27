"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({ subsets: ["latin"] });
const sffont = localFont({
  src: [
    {
      path: "/fonts/sfproregular.otf",
      weight: "400",
    },
    {
      path: "/fonts/sfpromedium.otf",
      weight: "500",
    },
    {
      path: "/fonts/sfprobold.otf",
      weight: "700",
    },
  ],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={sffont.className}>{children}</body>
    </html>
  );
}
