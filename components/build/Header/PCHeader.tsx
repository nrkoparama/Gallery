import Link from "next/link";
import Image from "next/image";
import type {Author} from "@/types/Author";
import {Bell, Heart} from 'lucide-react';
import {activeToast} from "@/utils/activeToast";
import {useState} from "react";
import {signOut} from "next-auth/react";
import {Tooltip, TooltipContent, TooltipTrigger,} from "@/components/ui/tooltip";

const links = [
    {title: "Bài viết", path: "/blog"},
    {title: "Thư viện ảnh", path: "/gallery"},
    {title: "Liên hệ", path: "/contact"},
    {title: "Hỗ trợ", path: "/help"},
]
const userAllowedPath = [
    {title: "Trang cá nhân", path: "/account"},
    {title: "Thông tin tài khoản", path: "/account/setting/profile",},
]
const colors = ["red", "blue", "green", "purple"];
const randomColors = Math.floor(Math.random() * colors.length);


export default function PCHeader({author}: { author: Author | null }) {
    const [userMenu, setUserMenu] = useState(false);
    const bgAvtColor = colors[randomColors];

    const handleSignOut = () => {
        activeToast("Đăng xuất thành công", {
            type: "success",
            description: ""
        })

        setTimeout(() => {
            signOut();
        }, 3000)
    }

    return (
        <nav className="grid grid-cols-3 items-center">

            <div className={`tracking-wider`}>
                <ul className={`flex justify-around`}>
                    {links.map((l) => (
                        <Link key={l.path} href={l.path}>
                            <li className={`capitalize`}>{l.title}</li>
                        </Link>
                    ))}
                </ul>
            </div>

            <div>
                <Link href="/public" className={`w-28 h-28 aspect-square mx-auto flex justify-center items-center`}>
                    <Image src="/assets/icons/neko.png" alt="GallerySection logo" width={100} height={100} priority/>
                </Link>
            </div>

            {author ?
                <div className={`pr-20 flex justify-end items-center gap-6`}>
                    <div className={`relative`}>
                        {author.image ?
                            <div className={`p-0.5 shadow-lg rounded-full hover:cursor-pointer`}>
                                <div className={`relative w-10 h-10 aspect-square rounded-full overflow-hidden shadow-lg`}>
                                    <Image
                                        src={author.image}
                                        alt={`${author.lastName} avatar`}
                                        fill
                                        sizes={"40"}
                                        onClick={() => setUserMenu(!userMenu)}
                                        className={`object-cover`}
                                    />
                                </div>
                            </div>
                            :
                            <div onClick={() => setUserMenu(!userMenu)}
                                 className={`w-10 h-10 bg-${bgAvtColor}-500 text-white p-0.5 rounded-full shadow-lg flex justify-center items-center hover:cursor-pointer`}>
                                {author.lastName.slice(0, 1)}
                            </div>
                        }
                        <div className={`absolute ${userMenu ? "block" : "hidden"} top-14 left-2 z-10 w-52 bg-white py-2 px-2.5 border rounded shadow`}>
                            <ul className={`space-y-2`}>
                                {userAllowedPath.map((p) => (
                                    <Link
                                        key={p.path}
                                        href={p.path}
                                        className={`block px-2.5 py-1.5 rounded hover:cursor-pointer hover:bg-gray-100`}>
                                        <li>{p.title}</li>
                                    </Link>
                                ))}

                                <li className={`px-2.5 py-1.5 rounded hover:cursor-pointer hover:bg-gray-100`}
                                    onClick={() => handleSignOut()}>Đăng xuất
                                </li>
                            </ul>
                        </div>

                    </div>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => console.log("Favorite")}
                                className={`group hover:bg-rose-500/10 p-2.5 rounded-full transition-colors duration-300 hover:cursor-pointer`}>
                                <Heart className={`group-hover:text-rose-500`}/>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Yêu thích</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div
                                onClick={() => console.log("Notification")}
                                className={`group hover:bg-teal-500/10 p-2.5 rounded-full transition-colors duration-300 hover:cursor-pointer`}
                            >
                                <Bell className={`group-hover:text-teal-500`}/>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Thông báo</TooltipContent>
                    </Tooltip>
                </div>
                :
                <div className={`pr-20 flex justify-end gap-6`}>
                    <Link href="/account/login" className={`block w-[30%]`}>
                        <button className="w-full bg-[#008080] text-white px-3 py-2 rounded hover:cursor-pointer">
                            Đăng nhập
                        </button>
                    </Link>
                </div>
            }

        </nav>
    )
}