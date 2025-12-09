"use client";
import React from "react";
import Image from "next/image";

type GalleryProps = {
    images: string[],
    props?: React.HTMLAttributes<HTMLDivElement>
}

export default function GallerySection({images, props}: GalleryProps) {
    return (
        <section className={`container px-4 md:px-6 xl:px-8`} {...props}>
            <div className={`flex flex-col justify-center items-center space-y-3`}>
                <h2 className={`text-xl uppercase font-semibold`}>thư viện ảnh</h2>
                <div className={`relative w-[600px] min-h-[480px] mt-8`}>
                    {/*bottom*/}
                    <div
                        className={`absolute -left-60 top-10 z-15 hover:z-30 bg-white p-4 border-2 rounded transition-transform duration-500 rotate-[10deg] hover:rotate-0 hover:scale-125`}>
                        <div className={`relative w-60 h-72 mb-8 aspect-[9/16] overflow-y-hidden`}>
                            <Image
                                src={images[0]}
                                alt={`test anh3`}
                                fill
                                sizes={`100`}
                                className={`object-cover rounded`}
                            />
                        </div>
                    </div>
                    <div
                        className={`absolute -right-60 top-10 z-0 hover:z-30 bg-white p-4 border-2 rounded transition-transform duration-500 -rotate-[30deg] hover:rotate-0 hover:scale-125`}>
                        <div className={`relative w-60 h-72 mb-8 aspect-[9/16] overflow-y-hidden`}>
                            <Image
                                src={images[1]}
                                alt={`test anh3`}
                                fill
                                sizes={`100`}
                                className={`object-cover rounded`}
                            />
                        </div>
                    </div>

                    {/*middle*/}
                    <div
                        className={`absolute right-80 -top-3 z-10 hover:z-30 bg-white p-4 border-2 rounded transition-transform duration-500 -rotate-[10deg] hover:rotate-0 hover:scale-125`}>
                        <div className={`relative w-60 h-72 mb-8 aspect-[9/16] overflow-y-hidden`}>
                            <Image
                                src={images[2]}
                                alt={`test anh3`}
                                fill
                                sizes={`100`}
                                className={`object-cover rounded`}
                            />
                        </div>
                    </div>
                    <div
                        className={`absolute right-18 top-8 z-10 hover:z-30 bg-white p-4 border-2 rounded transition-transform duration-500 rotate-[15deg] hover:rotate-0 hover:scale-125 `}>
                        <div className={`relative w-60 h-72 mb-8 aspect-[9/16] overflow-y-hidden`}>
                            <Image
                                src={images[3]}
                                alt={`test anh3`}
                                fill
                                sizes={`100`}
                                className={`object-cover rounded`}
                            />
                        </div>
                    </div>

                    {/*top*/}
                    <div
                        className={`absolute right-40 top-0 z-20 bg-white p-4 border-2 rounded transition-transform duration-500 -rotate-[3deg] hover:rotate-0 hover:scale-125`}>
                        <div className={`relative w-60 h-72 mb-8 aspect-[9/16] overflow-y-hidden`}>
                            <Image
                                src={images[4]}
                                alt={`test anh3`}
                                fill
                                sizes={`100`}
                                className={`object-cover rounded`}
                            />
                        </div>
                    </div>

                </div>
                <div className={`w-[50%] mx-auto flex justify-between`}>
                    <div>
                        <p>Ảnh miễn phí</p>
                        <p className={`text-xl font-semibold text-center mt-0.5`}>1000 +</p>
                    </div>
                    <div>
                        <p>Lượt tải xuống</p>
                        <p className={`text-xl font-semibold text-center mt-0.5`}>1000+</p>
                    </div>
                    <div>
                        <p>Người dùng</p>
                        <p className={`text-xl font-semibold text-center mt-0.5`}>500+</p>
                    </div>
                </div>
            </div>

        </section>
    )
}