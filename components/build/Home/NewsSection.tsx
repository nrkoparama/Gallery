"use client";
import Link from "next/link";
import {ChevronDown} from "lucide-react";
// import {useRouter} from "next/navigation";
import {HTMLAttributes} from "react";
import Image from "next/image";

type NewsProps = {
    titleSection: string,
    blogs: { title: string, content: string, image: string }[] // sửa thành Blog[]
    props?: HTMLAttributes<HTMLDivElement>
}
const date = new Date();

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

export default function NewsSection({titleSection,blogs, props}: NewsProps) {
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
                            className={`bg-white p-4 border-2 shadow`}>
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
                                <p className={`opacity-80`}>
                                    {date.toLocaleString("vi-VN")}
                                </p>
                                <p className={`line-clamp-3`}>{blog.content}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link href={"/post"} className={`inline-flex justify-center items-center gap-1 opacity-80 hover:opacity-100 cursor-pointer`}>
                    Xem thêm
                    <span>
                        <ChevronDown size={16} strokeWidth={1.75}/>
                    </span>
                </Link>
            </div>

            {/*Overlay*/}


        </section>
    )
}