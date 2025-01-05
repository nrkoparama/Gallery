"use client"
import Link from "next/link";

function Footer(){
    return (
        <footer className="tracking-wider my-6">
            <p className="text-xl flex justify-center">©2024 <Link href="/" className="mx-[4px] text-[#fa7566]">Gallery</Link>. All right reserved. Made with all love by<Link href="https://github.com/nrkoparama" className="mx-[4px] text-[#fa7566]">Nrko34</Link></p>
        </footer>
    )
}
export default Footer;
