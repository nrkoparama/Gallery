"use client";
import type { Metadata } from "next";
import "./globals.css";
import { usePathname } from "next/navigation";

import Header from "./components/header";
import Footer from "./components/footer";

// export const metadata: Metadata = {
//   title: "Gallery",
//   description:
//     "Đây là trang web mình tạo ra với mục đích lưu giữ những kỉ niệm của bản thân",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const currentPath = pathname.split("/");
  
  const paths = ["/pages/about","/pages/gallery"];
  const condition = paths.some((path) => pathname.startsWith(path));
  return (
    <html lang="en">
      <body className="bg-[#fef2f2] text-[#555353] antialiased">
        {!condition && <Header title={currentPath[2] ?? "home"} />}
        {children}
        {!condition && <Footer />}
      </body>
    </html>
  );
}
