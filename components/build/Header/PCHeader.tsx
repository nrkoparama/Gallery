import Link from "next/link";
import Image from "next/image";
import type {Author} from "@/types/Author";
// import {activeToast} from "@/utils/activeToast";
// import {useState} from "react";
// import {signOut} from "next-auth/react";
import {Bell, Settings} from 'lucide-react';

const links = [
    {title: "Bài viết", path: "/blog"},
    {title: "Thư viện ảnh", path: "/post"},
    {title: "Liên hệ", path: "/contact"},
    {title: "Hỗ trợ", path: "/help"},
]
// const userAllowedPath = [
//     {title: "Trang cá nhân", path: "/account"},
//     {title: "Thông tin tài khoản", path: "/account/s/profile",},
// ]
// const colors = ["red", "blue", "green", "purple"];
// const randomColors = Math.floor(Math.random() * colors.length);


export default function PCHeader({author}: { author: Author | null }) {
    // const [userMenu, setUserMenu] = useState(false);
    // const bgAvtColor = colors[randomColors];

    // const handleSignOut = () => {
    //     activeToast("Đăng xuất thành công", {
    //         type: "success",
    //         description: ""
    //     })
    //
    //     setTimeout(() => {
    //         signOut();
    //     }, 3000)
    // }

    return (
        <nav className="container w-[90%] mx-auto px-4 md:px-6 xl:px-8 py-2 grid grid-cols-12 items-center">

            <Link href={"/"} className={`col-span-3 flex items-center`}>
                <Image
                    src={"/assets/icons/logo.png"}
                    alt="Gallery Logo"
                    width={60}
                    height={80}
                    priority
                />
                <p className={`text-2xl font-semibold`}>Gallery</p>
            </Link>

            <div className={`col-span-6`}>
                <ul className={`w-[80%] mx-auto flex justify-between`}>
                    {links.map((l) => (
                        <Link key={l.path} href={l.path} className={`custom-underline`}>
                            <li>{l.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div className={`col-span-3`}>
                {!author ? (
                    <div className={`flex justify-end items-center space-x-6`}>
                        <div className={`relative w-9 h-9 rounded-full overflow-hidden cursor-pointer`}>
                            <Image
                                src={`/assets/icons/avt.webp`}
                                alt={`Avatar`}
                                fill
                                sizes={`36`}
                                className={`object-cover`}
                            />
                        </div>

                        <Bell size={24} strokeWidth={1.75}
                              className={`hover:bg-teal-500/10 hover:text-teal-500 w-9 h-9 p-1.5 rounded-full cursor-pointer`}/>
                        <Settings size={24} strokeWidth={1.75} className={`cursor-pointer`}/>
                    </div>
                ) : (
                    <button>
                        Đăng nhập
                    </button>
                )}
            </div>


        </nav>
    )
}