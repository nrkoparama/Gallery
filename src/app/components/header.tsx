"use client";
import Link from "next/link";
import type HeaderProps from "../models/headerProps.js";
function Header({ title }: HeaderProps) {
  return (
    <header className="w-full mt-[20px] tracking-wider flex flex-col">
      <p className="text-5xl text-center capitalize">#{title}</p>
      <nav className="text-2xl capitalize mt-6">
        <ul className="flex justify-center space-x-14">
          <li>
            <Link
              href="/"
              className={`${
                title !== "home" ? "underline-effect" : "text-[#FA7566]"
              } hover:text-[#FA7566] `}
            >
              home
            </Link>
          </li>
          <li>
            <Link
              href="/pages/about"
              className={`${
                title !== "about" ? "underline-effect" : "text-[#FA7566]"
              } hover:text-[#FA7566] `}
            >
              about
            </Link>
          </li>
          <li>
            <Link
              href="/pages/gallery"
              className={`${
                title !== "gallery" ? "underline-effect" : "text-[#FA7566]"
              } hover:text-[#FA7566] `}
            >
              gallery
            </Link>
          </li>
          <li>
            <Link
              href="/pages/contact"
              className={`${
                title !== "contact" ? "underline-effect" : "text-[#FA7566]"
              } hover:text-[#FA7566] `}
            >
              contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
