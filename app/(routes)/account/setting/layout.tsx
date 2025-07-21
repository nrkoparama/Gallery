"use client";
import React, {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";

import {ChevronDown, Folder, LockKeyhole, LogOut, User} from 'lucide-react';

const profileTabs = [
    {
        label: "Hồ sơ",
        link: "/account/setting/profile",
        pathName: "profile",
        tittle: "Thông tin tài khoản"
    },
    {
        label: "Mạng xã hội",
        link: "/account/setting/socials",
        pathName: "socials",
        tittle: "Thông tin tài khoản"
    },
    {
        label: "Xóa tài khoản",
        link: "/account/setting/delete-account",
        pathName: "delete-account",
        tittle: "Thông tin tài khoản"
    },
]

const libraryTabs = [
    {
        label: "Ảnh",
        link: "/account/setting/library",
        pathName: "library",
        tittle: "Thư viện"
    },
    {
        label: "Bài viết",
        link: "/account/setting/blogs",
        pathName: "blogs",
        tittle: "Thư viện"

    },
    {
        label: "Yêu thích",
        link: "/account/setting/favorites",
        pathName: "favorites",
        tittle: "Thư viện"
    },
    {
        label: "Dấu trang",
        link: "/account/setting/bookmarks",
        pathName: "bookmarks",
        tittle: "Thư viện"
    },
]

const passwordTabs = [
    {
        label: "Quên mật khẩu",
        link: "/account/setting/forgot-password",
        pathName: "forgot-password",
        tittle: "Mật khẩu"
    },
    {
        label: "Đổi mật khẩu",
        link: "/account/setting/change-password",
        pathName: "change-password",
        tittle: "Mật khẩu"

    },

]

type Tab = {
    tittle?: string,
    label?: string,
    pathName?: string,
    link?: string
}

export default function ConfigAccLayout({children}: { children: ReactNode }) {
    const path = usePathname();
    const [currentPathName, setCurrentPathName] = useState<string | undefined>();
    const [expand, setExpand] = useState(true);
    const [profileTab, setProfileTab] = useState(true);
    const [libraryTab, setLibraryTab] = useState(true);
    const [passwordTab, setPasswordTab] = useState(true);
    const [tab, setTab] = useState<Tab | undefined>(profileTabs[0]);
    const handleLogout = () => {
        return console.log("AAAAA")
    }


    // cập nhật currentPathName
    useEffect(() => {
        const parts = path.split("/");
        setCurrentPathName(parts[parts.length - 1]);
    }, [path]);

    return (
        <section className={`w-full h-full`}>
            <div className={`w-[90%] h-full mx-auto pt-12 flex`}>
                <div className={`w-[90%] mx-auto flex gap-4`}>
                    {/* Sidebar */}
                    <div className={`${expand ? "w-[30%]" : "w-[10%]"} h-full pl-4 flex flex-col`}>
                        {/* Account */}
                        <div className={`w-full py-6 border-b-[1px] flex items-center gap-3`}>
                            <Link href={`/account/setting/profile`}>
                                <Image
                                    src={`/assets/icons/cat.png`}
                                    alt={`Tan Dat avatar`}
                                    width={60}
                                    height={60}
                                    priority
                                    className={`rounded-full border`}
                                />
                            </Link>
                            <div>
                                <p className={`text-lg font-bold`}>Võ Tấn Đạt</p>
                                <p className={`text-xs text-gray-400`}>@J6RFIGTRHT</p>
                            </div>
                        </div>

                        {/* Menu */}
                        <div className={`my-6 px-2 flex flex-col space-y-3`}>

                            <div className={`flex flex-col space-y-2`}>

                                {/* Tab */}
                                <div onClick={() => setProfileTab(!profileTab)}
                                     className={`w-full text-gray-700 px-2 py-2 rounded flex justify-between items-center hover:cursor-pointer`}>
                                    <div className={`flex items-center gap-2`}>
                                        <User/>
                                        <p>Thông tin tài khoản</p>
                                    </div>
                                    <ChevronDown strokeWidth={1.5}
                                                 className={`mr-2 ${profileTab ? `rotate-180` : `rotate-0`} transition-all duration-200`}/>
                                </div>

                                {/*Sub tab*/}
                                {profileTab && (<div className={`w-[84%] mx-auto border-l-2`}>
                                    <ul className={`flex flex-col space-y-2`}>
                                        {profileTabs.map((tab, index) => (
                                            <Link key={index} href={tab.link} onClick={() => setTab(tab)}>
                                                <li className={`block w-[90%] ${currentPathName === tab.pathName ? "text-gray-700" : "text-gray-400"} hover:text-gray-700 mx-auto px-3 py-1 rounded`}>
                                                    {tab.label}
                                                </li>
                                            </Link>

                                        ))}

                                    </ul>
                                </div>)}

                            </div>

                            <div className={`flex flex-col space-y-2`}>
                                {/* Tab */}
                                <div
                                    onClick={() => setLibraryTab(!libraryTab)}
                                    className={`w-full text-gray-700 px-2 py-2 rounded flex justify-between items-center hover:cursor-pointer`}>
                                    <div className={`flex items-center gap-2`}>
                                        <Folder/>
                                        <p>Thư viện</p>
                                    </div>
                                    <ChevronDown strokeWidth={1.5}
                                                 className={`mr-2 ${libraryTab ? `rotate-180` : `rotate-0`} transition-all duration-200`}/>
                                </div>
                                {/*Sub tab*/}
                                {libraryTab && (
                                    <div className={`w-[84%] mx-auto border-l-2`}>
                                        <ul className={`flex flex-col space-y-2`}>
                                            {libraryTabs.map((tab, index) => (
                                                <Link key={index} href={tab.link}
                                                      onClick={() => setTab(tab)}>
                                                    <li className={`block w-[90%]  ${currentPathName === tab.pathName ? "text-gray-700" : "text-gray-400"} hover:text-gray-700 mx-auto px-3 py-1 rounded`}>
                                                        {tab.label}
                                                    </li>
                                                </Link>

                                            ))}

                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col space-y-2`}>
                                {/* Tab */}
                                <div
                                    onClick={() => setPasswordTab(!passwordTab)}
                                    className={`w-full text-gray-700 px-2 py-2 rounded flex justify-between items-center hover:cursor-pointer`}>
                                    <div className={`flex items-center gap-2`}>
                                        <LockKeyhole/>
                                        <p>Mật khẩu</p>
                                    </div>
                                    <ChevronDown strokeWidth={1.5}
                                                 className={`mr-2 ${passwordTab ? `rotate-180` : `rotate-0`} transition-all duration-200`}/>
                                </div>
                                {/*Sub tab*/}
                                {passwordTab && (
                                    <div className={`w-[84%] mx-auto border-l-2`}>
                                        <ul className={`flex flex-col space-y-2`}>
                                            {passwordTabs.map((tab, index) => (
                                                <Link key={index} href={tab.link}
                                                      onClick={() => setTab(tab)}>
                                                    <li className={`block w-[90%]  ${currentPathName === tab.pathName ? "text-gray-700" : "text-gray-400"} hover:text-gray-700 mx-auto px-3 py-1 rounded`}>
                                                        {tab.label}
                                                    </li>
                                                </Link>

                                            ))}

                                        </ul>
                                    </div>
                                )}
                            </div>



                            <div onClick={() => handleLogout()}
                                 className={`w-full  mt-32 px-2 py-2 rounded flex items-center gap-2`}>
                                <LogOut/>
                                <p>Đăng xuất</p>
                            </div>

                        </div>


                    </div>

                    {/* Content */}
                    <div className={`w-[70%] bg-white px-12 shadow-md rounded`}>
                        {/* Header */}
                        <div className={`w-full mt-8 pb-6 border-b-2`}>
                            <p className={`text-lg font-bold`}>{tab?.tittle}</p>
                            <p>{tab?.label}</p>
                        </div>
                        {children}
                    </div>
                </div>

            </div>
        </section>
    )
}