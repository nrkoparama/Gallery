"use client";
import React from "react";
import {useForm} from "react-hook-form";
import type {SubscribeNewsLetterForm} from "@/types/Form";
import {yupResolver} from "@hookform/resolvers/yup";
import {newsLetterSchema} from "@/types/Yup.Schema";

export default function SubscribeNewsLetterSection(props: React.HTMLAttributes<HTMLDivElement>) {
    const {handleSubmit, clearErrors, register} = useForm<SubscribeNewsLetterForm>({
        mode: "onSubmit",
        resolver: yupResolver(newsLetterSchema)
    });
    const submit = handleSubmit(async (data) => {
        console.log(data);
    })

    return (
        <div className={`container px-4 md:px-6 xl:px-8 py-5 bg-[#008080] text-white`} {...props}>
            <form onSubmit={submit}>
                <div className={`flex justify-between items-center`}>
                    <div className={`w-[60%] flex flex-col`}>
                        <p className={`uppercase font-semibold`}>
                            bắt kịp xu hướng
                        </p>
                        <p>
                            Đăng ký để nhận tin khi có ưu đãi cũng như những tin tức và
                            sự kiện thú vị !
                        </p>
                    </div>
                    <div className={`relative w-[40%] flex justify-end`}>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            onChange={() => clearErrors("email")}
                            placeholder={"Nhập địa chỉ email"}
                            className={`w-[70%] bg-white text-gray-700 text-ellipsis px-3 py-2 focus:outline-none`}
                        />
                        {/*<Input id="email" register={} o/>*/}
                        <button className={`w-[30%] px-2.5 py-3 bg-black font-semibold`}>
                            ĐĂNG KÝ
                        </button>

                    </div>
                </div>
            </form>
        </div>
    )
}