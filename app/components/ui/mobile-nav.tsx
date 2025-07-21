"use client";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {usePathname} from "next/navigation";
// import { Fragment } from "react";
import {CircleCheck , X} from "lucide-react";

import Toast from "@/app/components/ui/toast";

interface MobileNavProps {
    setActive: (value: boolean) => void;
}

export default function MobileNav({setActive}: MobileNavProps) {
    const path = usePathname();
    const languages = ["Việt Nam", "English"];
    const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
    const [lgPopup, setLgPopup] = useState(false);
    const [successPopup, setSuccessPopup] = useState(false);

    const navLinks = [
        {href: `/`, label: `trang chủ`},
        {href: `/pages/about`, label: `giới thiệu`},
        {href: `/pages/gallery`, label: `thư viện`},
        {href: `/pages/account`, label: `tài khoản`},
        {href: `/pages/contact`, label: `liên hệ`},
    ];

    const handleChangeLanguage = async (language: string) => {
        setCurrentLanguage(language);
        setLgPopup(false);
        setSuccessPopup(true);
    };

    return (
        <section className={`fixed top-0 left-0 z-10 w-full h-full bg-[#fef2f2] flex justify-center`}>
            <nav className={`mx-auto flex flex-col items-center`}>
                <Image
                    src={`/assets/images/neko.png`}
                    alt={`Logo`}
                    width={160}
                    height={160}
                    priority={true}
                />

                <div
                    className={`text-2xl font-medium uppercase flex flex-col items-center space-y-5`}
                >
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`${
                                path === item.href ? `text-[var(--text-hover-color)]` : ``
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div
                    className={`w-20 flex flex-col items-center space-y-5 mt-30 lg:mt-40`}
                >
                    <button
                        onClick={() => setLgPopup(!lgPopup)}
                        className={`text-2xl font-medium uppercase border-b-3 border-gray-300 cursor-pointer`}
                    >
                        vn
                    </button>
                    <Link href={`https://www.instagram.com/`} target="_blank">
                        <Image
                            src={`/assets/images/instagram.png`}
                            alt={`Logo`}
                            width={32}
                            height={32}
                        />
                    </Link>
                </div>
            </nav>

            <button onClick={() => setActive(false)}>
                <X size={28} strokeWidth={3} className={`absolute top-20 right-10 lg:right-30`}/>
            </button>

            {/* language popup  */}
            <div
                className={`${
                    lgPopup ? `block` : `hidden`
                } fixed top-0 left-0 z-50 w-full h-full`}
            >
                <div
                    onClick={() => setLgPopup(!lgPopup)}
                    className={`absolute top-0 left-0 w-full h-full bg-[#7e817d] opacity-50`}
                ></div>

                <div
                    className={`relative z-10 w-[60%] max-w-[500px] bg-white text-xl mx-auto mt-60 px-4 py-5 rounded-lg flex flex-col items-center`}
                >
                    <p>Chọn ngôn ngữ</p>

                    <div className={`mt-4 flex flex-col items-center space-y-3`}>
                        {languages.map((language, index: number) => (
                            <div key={index} className={` `}>
                                <button
                                    onClick={() => handleChangeLanguage(language)}
                                    disabled={currentLanguage === language}
                                    className={`${
                                        currentLanguage === language ? `` : `opacity-50`
                                    } cursor-pointer`}
                                >
                                    {language}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Toast
                icon={<CircleCheck size={20} color={`#22C55E`}/>}
                message="Đổi ngôn ngữ thành công"
                visible={successPopup}
                setVisible={setSuccessPopup}
            />
        </section>
    );
}
