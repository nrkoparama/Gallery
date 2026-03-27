"use client";
import {HTMLAttributes, useState} from "react";
import {useOnInView} from "react-intersection-observer";

import Button from "@/components/build/Button";

import Image from "next/image";

type ExploreSectionProps = {
    images: string[],
    props?: HTMLAttributes<HTMLDivElement>
}

export default function ExploreSection({...props}: ExploreSectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const inViewRef = useOnInView(inView => {
        if (inView) {
            setIsVisible(true);
        } else {
            setIsVisible(prev => prev)
        }
    }, {threshold: 0, rootMargin: "-600px", triggerOnce: true,});
    return (
        <section id="explore" ref={inViewRef} className={`container px-4 md:px-6 xl:px-8`} {...props}>
            <div className={`relative w-full min-h-screen`}>

                <div className={`absolute right-72 top-12 z-10 hover:z-20 bg-white p-1 border-2 cursor-pointer
                     transition-transform duration-1000 ${isVisible ? "-translate-y-10 translate-x-14" : "opacity-0"}`}>
                    <div className={`relative w-96 h-36 aspect-auto`}>
                        <Image
                            src={"/assets/demo/9.webp"}
                            alt={`Ảnh`}
                            fill
                            className={`object-cover`}
                        />
                    </div>
                </div>

                <div className={`absolute right-16 top-60 -z-10 hover:z-20 bg-white p-1 border-2 cursor-pointer
                 transition-transform duration-1250 ${isVisible ? "-translate-y-10 translate-x-14" : "opacity-0"}`}>
                    <div className={`relative w-72 h-40 aspect-auto`}>
                        <Image
                            src={"/assets/demo/2.jpg"}
                            alt={`Ảnh`}
                            fill
                            className={`object-cover`}
                        />
                    </div>
                </div>

                <div className={`absolute right-60 bottom-20 -z-10 hover:z-20 bg-white p-1 border-2 cursor-pointer
                transition-transform duration-1500 ${isVisible ? "-translate-y-10 translate-x-14" : "opacity-0"}`}>
                    <div className={`relative w-72 h-36 aspect-auto`}>
                        <Image
                            src={"/assets/demo/3.jpg"}
                            alt={`Ảnh`}
                            fill
                            className={`object-cover`}
                        />
                    </div>
                </div>

                <div className={`absolute left-60 bottom-20 -z-10 hover:z-20 bg-white p-1 border-2 cursor-pointer
                transition-transform duration-1500 ${isVisible ? "-translate-y-10 -translate-x-14" : "opacity-0"}`}>
                    <div className={`relative w-72 h-36 aspect-auto`}>
                        <Image
                            src={"/assets/demo/6.jpg"}
                            alt={`Ảnh`}
                            fill
                            className={`object-cover`}
                        />
                    </div>
                </div>

                <div className={`absolute left-16 top-60 -z-10 hover:z-20 bg-white p-1 border-2 cursor-pointer
                transition-transform duration-1250 ${isVisible ? "-translate-y-10 -translate-x-14" : "opacity-0"}`}>
                    <div className={`relative w-72 h-40 aspect-auto`}>
                        <Image
                            src={"/assets/demo/7.jpg"}
                            alt={`Ảnh`}
                            fill
                            className={`object-cover`}
                        />
                    </div>
                </div>

                <div className={`absolute left-72 top-12 z-10 hover:z-20 bg-white p-1 border-2 cursor-pointer
                transition-transform duration-1000 ${isVisible ? "-translate-y-10 -translate-x-14" : "opacity-0"}`}>
                    <div className={`relative w-96 h-36 aspect-auto`}>
                        <Image
                            src={"/assets/demo/8.webp"}
                            alt={`Ảnh`}
                            fill
                            className={`object-cover`}
                        />
                    </div>
                </div>

                <div className={`absolute inset-0 z-20 w-full flex justify-center items-center`}>
                    <div className={`text-center flex flex-col justify-center items-center space-y-3`}>
                        <h2 className={`text-xl uppercase font-semibold transition-transform duration-1000 ${isVisible ? "-translate-y-10" : "opacity-0 translate-y-0"}`}>
                            Khám phá <br/>
                            Những câu chuyện qua những tấm ảnh
                        </h2>
                        <p className={`transition-transform duration-1250 ${isVisible ? "-translate-y-10" : "opacity-0"}`}>
                            Mỗi một tấm ảnh đều mang một câu chuyện, một cảm xúc riêng đối với mỗi người <br/>
                            Hãy tham gia cùng chúng tôi và viết nên câu chuyện của riêng mình
                        </p>
                        <Button
                            typeButton="link"
                            path="/post"
                            text="Tham gia ngay"
                            className={`bg-[#008080]/80 hover:bg-[#008080] text-white rounded-full px-6 py-2.5 cursor-pointer transition-transform duration-1500 ${isVisible ? "-translate-y-10" : "opacity-0"}`}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}