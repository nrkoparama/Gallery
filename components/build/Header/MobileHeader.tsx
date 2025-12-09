"use client";
import {Bell, Menu, User} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import HiddenMenu from "@/components/build/Header/HiddenMenu";
import type {Author} from "@/types/Author";

export default function MobileHeader({author}: { author: Author | null }) {
    const router = useRouter();
    const [newNotificationCount, setNewNotificationCount] = useState(1);
    const [scrollEvt, setScrollEvt] = useState(false);

    useEffect(() => {
        function handleScroll() {
            console.log("scrolled")
            setScrollEvt(true);
        }

        window.addEventListener("scroll", handleScroll);

        return () => removeEventListener("scroll", handleScroll);
    }, []);


    return (
        <nav
            className={`top-0 left-0 z-50 bg-white w-full transition-transform duration-300 ${scrollEvt ? "-translate-y-full" : "translate-y-0"}`}>

            <div className={`w-[90%] mx-auto flex justify-between items-center`}>

                <div className={`w-[30%]`}>
                    <HiddenMenu>
                        <Menu size={28} strokeWidth={1.5} className={`mt-6 ml-2`}/>
                    </HiddenMenu>
                </div>

                <Link href="/public" className={`w-[30%] flex justify-center items-center`}>
                    <div className={`relative w-24 h-24 aspect-square`}>
                        <Image
                            src="/assets/icons/neko.png"
                            alt="Logo"
                            fill
                            sizes={"96px"}
                            priority
                            className={`object-cover`}
                        />
                    </div>
                </Link>

                <div className={`w-[30%] mt-6 flex justify-end`}>

                    {author ?
                        <div
                            onClick={() => setNewNotificationCount(prev => prev + 1)}
                            className={`relative mr-2`}>
                            <Bell size={28} strokeWidth={1.5}/>
                            {author && newNotificationCount >= 1 && (
                                <div
                                    className={`absolute top-[-2px] right-0 z-10 w-4 h-4 bg-red-500 text-xs text-white p-1 rounded-full flex justify-center items-center`}>
                                    1
                                </div>
                            )}
                        </div>
                        :
                        <User size={28} strokeWidth={1.5} onClick={() => router.push("/account/login")}
                              className={`mr-2`}/>
                    }

                </div>

            </div>

        </nav>
    )
}

