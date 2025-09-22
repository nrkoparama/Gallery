"use client";
import React, {ReactNode, useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {BookMarked, ChevronDown, LockKeyhole, LogOut, User} from 'lucide-react';
import {useAuthor} from "@/app/components/provider/authorContext.provider"
import {activeToast} from "@/utils/activeToast";
import {signOut} from "next-auth/react";

const tabs = [
    {
        title: "Thông tin tài khoản", icon: <User strokeWidth={1.75}/>, navigation: [
            {
                subtitle: "Hồ sơ",
                pathName: "profile",
                link: "/account/setting/profile"
            },
            {
                subtitle: "Mạng xã hội",
                pathName: "socials",
                link: "/account/setting/socials"
            },
            {
                subtitle: "Xóa tài khoản",
                pathName: "delete-account",
                link: "/account/setting/delete-account"
            }
        ],
    },
    {
        title: "Thư viện của bạn",
        icon: <BookMarked strokeWidth={1.75}/>,
        navigation: [
            {
                subtitle: "Ảnh",
                pathName: "library",
                link: "/account/setting/library"
            },
            {
                subtitle: "Bài viết",
                pathName: "blogs",
                link: "/account/setting/blogs"
            },
            {
                subtitle: "Yêu thích",
                pathName: "favorites",
                link: "/account/setting/favorites"
            },
            {
                subtitle: "Dấu trang",
                pathName: "bookmarks",
                link: "/account/setting/bookmarks"
            },
        ]
    },
    {
        title: "Bảo mật", icon: <LockKeyhole strokeWidth={1.75}/>, navigation: [
            {
                subtitle: "Quên mật khẩu",
                pathName: "forgot-password",
                link: "/account/setting/forgot-password"
            },
            {
                subtitle: "Đổi mật khẩu",
                pathName: "reset-password",
                link: "/account/setting/change-password"

            }
        ]
    }
]


export default function ConfigAccLayout({children}: { children: ReactNode }) {
    const path = usePathname();
    const {author, getAuthorAction} = useAuthor();
    const [currentPathName, setCurrentPathName] = useState<string | undefined>();
    const [openTab, setOpentab] = useState<Record<number, boolean>>({});

    const toggleTab = (index: number) => {
        setOpentab(pre => ({...pre, [index]: !pre[index]}))
    }

    const handleLogout = async () => {
        activeToast("Đăng xuất thành công", {
            type: "success",
            description: "Đang chuyển hướng về trang chủ",
            duration: 3000
        });
        setTimeout(() => {
            signOut({redirect: true, callbackUrl: "/"});
        }, 4000);
    }

    // cập nhật currentPathName
    useEffect(() => {
        const parts = path.split("/");
        setCurrentPathName(parts[parts.length - 1]);
    }, [path]);

    return (
        <section className={`xl:min-h-screen`}>
            <div className={`w-full px-32 py-8 grid xl:grid-cols-12`}>

                {/* Sidebar */}
                <div className={`col-span-3 flex flex-col`}>

                    {/* Account */}
                    <div className={`px-4 pb-6 border-b-[1px] flex gap-4`}>
                        <div className={`relative w-12 h-12 aspect-square p-4 rounded-full overflow-hidden`}>
                            <Image
                                src={author?.image ? author.image : "/assets/icons/default-user.jpg"}
                                alt={author?.fullName ? `${author.lastName} avatar` : "Default avatar"}
                                fill
                                sizes={"48px"}
                                className={`object-cover`}
                            />
                        </div>

                        <div className={`tracking-wider`}>
                            <p className={`font-semibold`}>{author?.fullName}</p>
                            <p className={`text-sm text-gray-400`}>&#64;{author?.tagName}</p>
                        </div>

                    </div>

                    {/* Menu */}
                    <div className={`my-6 px-2 flex flex-col space-y-3`}>

                        <div className={`flex flex-col space-y-2`}>
                            {tabs.map((tab, index) => (
                                <div key={index}>
                                    <div onClick={() => toggleTab(index)}
                                         className={`w-full text-gray-700 px-2 py-2 rounded flex justify-between items-center hover:cursor-pointer`}>
                                        <div className={`flex items-center gap-2`}>
                                            {tab.icon}
                                            <p>{tab.title}</p>
                                        </div>
                                        <ChevronDown
                                            strokeWidth={1.75}
                                            className={`mr-2 ${openTab[index] ? `rotate-180` : `rotate-0`} transition-all duration-200`}
                                        />
                                    </div>

                                    {openTab[index] && (
                                        <div className={`w-[84%] mx-auto border-l-2`}>
                                            <ul className={`flex flex-col space-y-2`}>
                                                {tab.navigation.map((subTab, subIndex) => (
                                                    <Link key={subIndex} href={subTab.link}>
                                                        <li className={`block w-[90%] ${currentPathName === subTab.pathName ? "text-gray-700" : "text-gray-400"} hover:text-gray-700 mx-auto px-3 py-1 rounded`}>
                                                            {subTab.subtitle}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                            ))}


                        </div>


                        <div onClick={() => handleLogout()}
                             className={`w-full px-2 py-2 rounded flex items-center gap-2`}>
                            <LogOut strokeWidth={1.75}/>
                            <p>Đăng xuất</p>
                        </div>

                    </div>


                </div>

                {/* Content */}
                <div className={`col-span-9 h-full`}>
                    <div className={`w-full xl:max-h-[440px] bg-white px-14 py-8 rounded`}>
                        {children}
                    </div>
                </div>

            </div>
        </section>

    )
}