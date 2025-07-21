"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";

import {Home} from "lucide-react";

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <section className={`w-full tracking-wide flex flex-col justify-center items-center space-y-10`}>
            <Image
                src={`/assets/icons/404-not-found.png`}
                alt={`Not fond image`}
                priority={true}
                width={360}
                height={360}
            />

            <div className={`text-xl font-semibold flex flex-col items-center space-y-5`}>
                <p>Oops, có vẻ bạn bị lạc rồi.</p>
                <div
                    onClick={() => router.push("/")}
                    className={`hover:text-[#00009C] flex justify-center gap-2 hover:cursor-pointer`}
                >
                    <Home/>
                    <p className={``}>
                        Về trang chủ
                    </p>
                </div>
            </div>
        </section>
    )
}