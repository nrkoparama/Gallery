"use client";
import {HTMLAttributes, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {useOnInView} from "react-intersection-observer";

export default function SliderSection(props: HTMLAttributes<HTMLDivElement>) {
    const [isVisible, setIsVisible] = useState(false);
    const inViewRef = useOnInView(
        (inView) => {
            if (inView) {
                setIsVisible(true);
            } else {
                setIsVisible(prev => prev)
            }
        },
        {
            threshold: 0,
            rootMargin: "0px",
            triggerOnce: true
        }
    );

    return (
        <div ref={inViewRef} {...props} className={`container`}>

            <div className={`relative w-full max-h-screen aspect-video`}>
                <Image
                    src="/assets/images/banners/banner8.jpg"
                    alt="Hero banner"
                    fill
                    className={`object-cover`}
                />
            </div>

            <div className={`absolute inset-0 z-10 text-white/60 font-normal flex justify-center`}>
                <div className={`w-full p-12 flex flex-col justify-center items-center space-y-5`}>

                    <p className={`text-8xl font-semibold inline-flex flex-col transition-transform duration-1000 ${isVisible ? "-translate-y-10" : "opacity-0"}`}>
                            <span className={`text-lg text-left font-semibold`}>
                                2025
                            </span>
                        the turning soul
                    </p>
                    <p className={`transition-transform duration-1250 ${isVisible ? "-translate-y-10" : "opacity-0"}`}>
                        the soul can break, wander, and fall silent but the moment it whispers
                        &nbsp;
                        <span className={`bg-[#144fc6] text-white italic font-semibold px-0.5`}>
                                &nbsp;&quot; this is not the way &quot;&nbsp;
                        </span>
                        &nbsp;
                        that`&apos;`,s where healing begins.
                        <br/>
                    </p>
                    <p className={`transition-transform duration-1500 ${isVisible ? "-translate-y-10" : "opacity-0"}`}>those
                        who turn back aren`&apos;`,t always whole, but they
                        are aware.</p>
                    <p className={`w-10 text-xl font-semibold custom-underline cursor-pointer transition-transform duration-1750 ${isVisible ? "-translate-y-10" : "opacity-0"}`}>
                        <Link href={"https://www.pinterest.com/fadhilahwahyunisiti/"} target="_blank">
                            Dila.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}