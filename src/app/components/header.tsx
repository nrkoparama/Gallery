"use client";
import Link from "next/link";
import HeaderProps  from "../models/headerProps.js";
function Header({ title }: HeaderProps) {
  return (
    <header className="w-full mt-[20px] tracking-wider flex flex-col">
      <p className="text-5xl text-center capitalize">#{title}</p>
      <nav className="text-2xl capitalize mt-6">
        <ul className="flex justify-center space-x-14">
          <Link href="/" className="underline-effect" title="trang chủ">
            <li>home</li>
          </Link>
          <Link href="about" className="underline-effect" title="về chủ web">
            <li>about</li>
          </Link>
          <Link
            href="gallery"
            className="underline-effect"
            title="thư viện ảnh"
          >
            <li>gallery</li>
          </Link>
          <Link href="contact" className="underline-effect" title="liên hệ">
            <li>contact</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
