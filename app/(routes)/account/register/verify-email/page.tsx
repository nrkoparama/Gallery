"use client";
import { useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// Api
import {SendMail} from "@/services/api/mail";

// Custom functions
import {activeToast} from "@/utils/activeToast";

// Components
import Form from "@/components/build/Form";

// Types
import type {VerifyEmailForm} from "@/types/Form";
import {verifyEmailSchema} from "@/types/Yup.Schema";

export default function EmailVerifyPage() {
    const router = useRouter();
    const [count, setCount] = useState(60);
    const [isSent, setIsSent] = useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

    const {register, handleSubmit, clearErrors, formState: {errors}} = useForm<VerifyEmailForm>({
        mode: 'onSubmit', // khi nào sẽ trigger
        resolver: yupResolver(verifyEmailSchema),
    });

    const submit = handleSubmit(async (data) => {
        const {email} = data;
        const res = await SendMail(email);

        let isSuccess = false;
        if (res.status_code === 200) isSuccess = true;

        activeToast(res.message, {
            type: isSuccess ? "success" : "error",
            description: isSuccess ? "Vui lòng kiểm tra email" : "Có lỗi trong quá trình tạo mã. Vui lòng thử lại sau!",
            duration:3000
        })

        if (isSuccess) {
            setIsSent(true);
            setCount(60); // Reset lại đếm
        }
        return;

    });

    useEffect(() => {
        if (isSent && count > 0) {
            const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [count, isSent]);

    useEffect(() => {
        const syncRegisterState = () => {
            const state = localStorage.getItem("_irs");
            if(!state){
                localStorage.setItem("_irs", JSON.stringify(false));
            } else {
                setIsRegisterSuccess(JSON.parse(state));
            }
        }

        const initialSyncTimeOut = setTimeout(syncRegisterState, 5000);

        window.addEventListener("storage", syncRegisterState);

        return () => {
            clearTimeout(initialSyncTimeOut);
            window.removeEventListener("storage", syncRegisterState);
        }
    }, []);

    return isRegisterSuccess ?
        (<Form>
            <div className={`text-teal-500 tracking-wider py-3 space-y-4`}>
                <h1 className={`text-2xl font-semibold`}>Đăng ký tài khoản thành công!</h1>

                <p>Bạn có thể đóng tab này lại</p>
            </div>
        </Form>)
        :
        (<Form tittle="Xác thực Email" login={true}>
            <form onSubmit={submit}>
                <div className={`space-y-4`}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                            Email <span className={`text-red-500`}>*</span>
                        </label>

                        <input
                            id="email"
                            type="text"
                            {...register("email")}
                            onChange={() => clearErrors('email')}
                            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none ring-inset ${errors.email ? "border-red-500 " : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition-all duration-200`}
                        />

                        {errors.email && (
                            <p className="mt-2 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="text-[#00009C] px-1 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => router.push("/account/login")}
                            className="hover:cursor-pointer"
                        >
                            Trang chủ
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/pages/account/forgot-password")}
                            className="hover:cursor-pointer"
                        >
                            Đăng nhập
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSent && count > 0}
                        className={`w-full bg-[#00009C] py-2.5 rounded-lg border-2 
                                    ${isSent && count > 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:bg-white text-white hover:text-[#00009C] hover:border-[#00009C] cursor-pointer"}`}
                    >
                        {isSent ? (count > 0 ? `${count}s` : "Xác thực lại") : "Xác thực"}
                    </button>
                </div>

            </form>
        </Form>)
}
