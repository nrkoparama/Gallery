"use client";
import Link from "next/link";
import Image from "next/image";
import React, {ReactNode} from "react";

/* ---------------------------------------- Custom hooks --------------------------------------------- */
import {useAuthor} from "@/app/components/provider/authorContext.provider";
/* ---------------------------------------- Components --------------------------------------------- */
import {Bell, Settings} from "lucide-react";


export default function SettingsLayout({children}: { children: ReactNode }) {
    const {author} = useAuthor();

    return (
        <section className={`xl:min-h-screen px-52 py-4`}>
            <div className={`tracking-widest flex flex-col gap-10`}>

                <div className={`flex justify-between items-start`}>

                    <div className={`flex pt-2.5 gap-6`}>
                        <div
                            className={`relative w-24 h-24 aspect-square rounded-full overflow-hidden border-2 shadow`}>
                            <Image
                                src={author?.image ? author.image : "/assets/icons/default-user.jpg "}
                                alt={`${author?.fullName} avatar`}
                                fill sizes={"96px"}
                                priority
                                className={`object-cover`}
                            />
                        </div>

                        <div className={`flex flex-col gap-6`}>

                            <div className={`tracking-wider`}>
                                <p className={`text-2xl font-semibold`}>{author?.fullName}</p>
                                <p className={`text-sm text-gray-500/50 font-semibold`}>@{author?.tagName}</p>
                            </div>

                            <div className={`flex gap-5`}>
                                <div className={`flex gap-6`}>
                                    <Link href="/account/tandat1223?tag=post">
                                        <p>105 Ảnh</p>
                                    </Link>
                                    <Link href="/account/tandat1223?tag=blog">
                                        <p>3 Bài viết</p>
                                    </Link>
                                </div>

                                <div className={`flex gap-2`}>
                                    {author?.achievements && author.achievements.length > 0 && (
                                        author?.achievements.map((a, index) => (
                                                <p key={index} title={a}>Icon{index + 1}</p>
                                            )
                                        )
                                    )}
                                </div>

                            </div>

                        </div>

                    </div>

                    {/*notification & setting & (date) & logout */}
                    <div className={`flex items-center gap-6`}>
                        <div
                            className={`group p-2.5 rounded-full transition-colors duration-300 hover:bg-rose-500/5 cursor-pointer`}>
                            <Bell size={28} strokeWidth={1.75} className={`group-hover:text-rose-500`}/>
                        </div>
                        <div
                            className={`group p-2.5 rounded-full transition-colors duration-300 hover:bg-blue-500/5 cursor-pointer`}>
                            <Settings size={28} strokeWidth={1.75} className={`group-hover:text-blue-500`}/>
                        </div>
                        <div className={`px-3 py-2.5 rounded-lg hover:bg-neutral-300/30 cursor-pointer`}>
                            <p>Đăng xuất</p>
                        </div>
                    </div>
                </div>

                {/*main content*/}
                <div className={`bg-white px-10 py-8 rounded-sm shadow-lg`}>
                    {children}
                </div>
            </div>

        </section>
    )
}

