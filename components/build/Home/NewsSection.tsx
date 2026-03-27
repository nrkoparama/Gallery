"use client";
import Link from "next/link";
import {MoveRight} from "lucide-react";
// import {useRouter} from "next/navigation";
import {HTMLAttributes} from "react";
import Image from "next/image";
import {customGetDate, customGetGMT, customGetTime} from "@/utils/date";

type NewsProps = {
    titleSection: string,
    blogs: { title: string, content: string, image: string }[] // sửa thành Blog[]
    props?: HTMLAttributes<HTMLDivElement>
}
const date = new Date("2025-12-18T09:00:00");

/**
 * Tailwind - Cách ngắt chữ và hiện "..."
 *
 * Ellipsis nhiều dòng: dùng class "line-clamp-<value>"
 *
 * - Quy định số hàng chữ hiện còn lại sẽ thành "..."
 *
 * Ellipsis 1 dòng: "h-<value> overflow-hidden text-ellipsis whitespace-nowrap"
 *
 * - Vì css mặc định chỉ cho phép ellipsis 1 dòng nên không có whitespace-nowrap dẫn dến text xuống dòng bình thường
 *
 * => không có ellipsis
 *
 * */

export default function NewsSection({titleSection, blogs, props}: NewsProps) {
    // const router = useRouter();

    return (
        <section className={`container px-4 md:px-6 xl:px-8`} {...props}>
            <div className={`w-[90%] mx-auto flex flex-col items-center space-y-5`}>
                <h2 className={`text-xl uppercase font-semibold`}>{titleSection}</h2>
                <div className={`grid grid-cols-1 md:grid-cols-4 gap-6`}>
                    {blogs.map((blog, index) => (
                        <Link
                            key={index}
                            href={`/blog?id=${index}`}
                            className={`bg-white p-4 border-2 rounded-md shadow`}>
                            <div className={`relative w-full h-64 aspect-auto`}>
                                <Image
                                    src={blog.image}
                                    alt={`Ảnh ${blog.title}`}
                                    fill
                                    className={`object-cover`}
                                />
                            </div>
                            <div className={`text-sm my-3 space-y-1`}>
                                <p className={`text-base font-semibold`}>
                                    {blog.title}
                                </p>
                                <p className={`opacity-80 tracking-widest inline-flex gap-x-1`}>
                                    {/*{date.toLocaleString("vi-VN")}*/}
                                    {/*{customGetDay(date.getDay())},*/}
                                    <span>
                                        {customGetDate(date)}
                                    </span>
                                    <span>
                                        {customGetTime(date)}
                                    </span>
                                    <span>
                                        {customGetGMT(date)}
                                    </span>
                                </p>
                                <p className={`line-clamp-3 opacity-80`}>{blog.content}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link
                    href={"/post"}
                    className={`group inline-flex items-center gap-1 opacity-80 duration-500 hover:opacity-100 hover:scale-110 cursor-pointer`}>
                    xem thêm
                    <span>
                        <MoveRight size={16} strokeWidth={1.75}
                                   className={`transition-transform duration-500 group-hover:rotate-45`}/>
                    </span>
                </Link>
            </div>

            {/*Overlay*/}


        </section>
    )
}