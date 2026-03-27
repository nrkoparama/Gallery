"use client";
import {useState} from "react";
// import {useParams} from "next/navigation";
import Image from "next/image";
import {Bookmark, EllipsisVertical, Heart, Share} from "lucide-react";

export default function Post() {
    // const params = useParams<{ slug: string }>();
    // const postSlug = params.slug;
    const [options, setOptions] = useState(false);
    return (
        <div className={`w-[90%] mx-auto`}>
            <div className={`w-full my-5 flex justify-between gap-3`}>
                <div className={`w-[68%]`}>
                    <div className={`relative w-full h-96 aspect-[16/9] overflow-hidden`}>
                        <Image
                            src={"/assets/images/banners/hero-banner.jpg"}
                            alt={"ảnh"}
                            fill
                            sizes={"100"}
                            className={`object-cover`}
                        />
                    </div>
                    <div className={`w-full mt-3 flex items-center gap-3 overflow-x-auto scrollbar-hide`}>
                        <div>
                            <div
                                className={`relative w-48 h-32 aspect-[16/9] border-gray-300 border-6 overflow-hidden`}>
                                <Image
                                    src={"/assets/images/banners/hero-banner.jpg"}
                                    alt={"ảnh"}
                                    fill
                                    sizes={"100"}
                                    className={`object-cover`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={`relative w-48 h-32 aspect-[16/9] overflow-hidden`}>
                                <Image
                                    src={"/assets/images/banners/hero-banner.jpg"}
                                    alt={"ảnh"}
                                    fill
                                    sizes={"100"}
                                    className={`object-cover`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={`relative w-48 h-32 aspect-[16/9] overflow-hidden`}>
                                <Image
                                    src={"/assets/images/banners/hero-banner.jpg"}
                                    alt={"ảnh"}
                                    fill
                                    sizes={"100"}
                                    className={`object-cover`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={`relative w-48 h-32 aspect-[16/9] overflow-hidden`}>
                                <Image
                                    src={"/assets/images/banners/hero-banner.jpg"}
                                    alt={"ảnh"}
                                    fill
                                    sizes={"100"}
                                    className={`object-cover`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={`relative w-48 h-32 aspect-[16/9] overflow-hidden`}>
                                <Image
                                    src={"/assets/images/banners/hero-banner.jpg"}
                                    alt={"ảnh"}
                                    fill
                                    sizes={"100"}
                                    className={`object-cover`}
                                />
                            </div>
                        </div>
                        <div>
                            <div className={`relative w-48 h-32 aspect-[16/9] overflow-hidden`}>
                                <Image
                                    src={"/assets/images/banners/hero-banner.jpg"}
                                    alt={"ảnh"}
                                    fill
                                    sizes={"100"}
                                    className={`object-cover`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`w-[32%] bg-white p-4 border rounded-md shadow space-y-8`}>
                    <div className={`space-y-5`}>
                        <div className={`flex justify-between items-center`}>
                            <div className={`flex items-center gap-2`}>
                                <div
                                    className={`w-12 h-12 bg-teal-500 text-white text-sm p-1 rounded-full flex justify-center items-center`}>
                                    Đ
                                </div>
                                <div className={`font-semibold inline-flex flex-col`}>
                                    Tấn Đạt
                                    <span className={`text-sm font-normal`}>@tandat1223</span>
                                </div>
                            </div>
                            <div onClick={()=>setOptions(!options)} className={`relative p-2 hover:bg-red-500 rounded-full cursor-pointer`}>
                                <EllipsisVertical size={20} strokeWidth={1.75}/>
                                <div
                                    className={`${options ? "block" : "hidden"} absolute bg-white top-10 right-4 z-10 w-52 px-1 py-2 rounded border border-black`}>
                                    <div
                                        className={`w-[96%] mx-auto rounded px-4 py-2 opacity-50 hover:bg-gray-300 hover:opacity-100`}>Báo
                                        cáo bài đăng
                                    </div>
                                    <div
                                        className={`w-[96%] mx-auto rounded px-4 py-2 opacity-50 hover:bg-gray-300 hover:opacity-100`}>Đăng
                                        ảnh
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`px-1 flex items-center gap-6`}>
                            <Heart size={20} strokeWidth={1.75}/>
                            <Bookmark size={20} strokeWidth={1.75}/>
                            <Share size={20} strokeWidth={1.75}/>
                        </div>

                        <div>
                            Đây là mô tả cơ bản dành cho bài test và không có ý nghĩa gì hơn
                        </div>
                        <div>
                            #test, #demo, #baimau
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>Có thể bạn sẽ thích</p>
            </div>
        </div>
    )
}