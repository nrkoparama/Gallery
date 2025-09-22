"use client";
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function NotFoundPage() {
    const router = useRouter();
    return (
        <section className={`xl:min-h-screen`}>
            <div className={`text-xl font-medium tracking-wider flex flex-col items-center space-y-8`}>
                <Image
                    src={`/assets/icons/404-not-found.png`}
                    alt={`Not found image`}
                    priority={true}
                    width={360}
                    height={360}
                />

                <p>Oops, có vẻ bạn bị lạc rồi.</p>

                <button onClick={() => router.push("/")} className={`bg-[#00ba7c] hover:bg-white text-white hover:text-[#00ba7c] px-6 py-2 border-2 border-[#00ba7c] rounded-lg hover:cursor-pointer`}>
                    Về trang chủ
                </button>

            </div>


        </section>
    )
}