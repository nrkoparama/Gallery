"use client";
import {HTMLAttributes} from "react";

import Button from "@/components/build/Button";

export default function ExploreSection(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <section className={`container px-4 md:px-6 xl:px-8`} {...props}>
            <div className={`text-center flex flex-col justify-center items-center space-y-3`}>
                <h2 className={`text-xl uppercase font-semibold`}>
                    Khám phá <br/>
                    Những câu chuyện qua những tấm ảnh
                </h2>
                <p>
                    Mỗi một tấm ảnh đều mang một câu chuyện, một cảm xúc riêng đối với mỗi người <br/>
                    Hãy tham gia cùng chúng tôi và viết nên câu chuyện của riêng mình
                </p>

                <Button
                    typeButton="link"
                    link="/post"
                    text="Tham gia ngay"
                    className={`bg-[#008080] text-white rounded-full px-6 py-2.5 cursor-pointer`}
                />
            </div>
        </section>
    )
}