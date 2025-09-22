"use client";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Form from "@/app/components/ui/Form"

// Api
import {SendMail} from "@/app/services/api/mail";

// Custom functions
import {activeToast} from "@/utils/activeToast"

// Types
interface EmailVerifyForm {
    email: string;
}

const schema = Yup.object({
    email: Yup.string()
        .trim()
        .email("* Email không hợp lệ")
        .required("* Vui lòng nhập email")
});

export default function EmailVerifyPage() {
    const router = useRouter();
    const [count, setCount] = useState(60);
    const [isSent, setIsSent] = useState(false);
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false)

    const {register, handleSubmit, clearErrors, formState: {errors},} = useForm<EmailVerifyForm>({
        mode: 'all', // khi nào sẽ trigger
        resolver: yupResolver(schema),
    });

    const submit = handleSubmit(async (data) => {
        const {email} = data;
        const res = await SendMail(email);

        let isSuccess = false;
        if (res.status_code === 200) isSuccess = true;

        activeToast(res.message, {
            type: isSuccess ? "success" : "error",
            description: isSuccess ? "Vui lòng kiểm tra email" : "Có lỗi trong quá trình tạo mã. Vui lòng thử lại sau!"
        })

        if (isSuccess) {
            setIsSent(true);
            setCount(60); // Reset lại đếm
        }
        return;

    });

    const closeTab = () => {
        localStorage.setItem("_irs", JSON.stringify(false));
        setTimeout(() => {
            router.push("/")
        })
    }

    useEffect(() => {
        if (isSent && count > 0) {
            const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [count, isSent]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let state = localStorage.getItem("_irs");

            if (!state) {
                localStorage.setItem("_irs", JSON.stringify(false));
                state = "false";
            }

            setTimeout(() => {
                setIsRegisterSuccess(JSON.parse(state!));
            }, 5000);

            return;
        }
    }, []);

    useEffect(() => {
        const getStateLocalStorage = () => {
            setIsRegisterSuccess(JSON.parse(localStorage.getItem("_irs")!));
        }

        window.addEventListener("storage", getStateLocalStorage);
        return () => removeEventListener("storage", getStateLocalStorage)
    }, []);

    return isRegisterSuccess ?
        (
            <Form>
                <div className={`text-teal-500 tracking-wider py-3 space-y-4`}>
                    <h1 className={`text-2xl font-semibold`}>Đăng ký tài khoản thành công!</h1>

                    <p>Bạn có thể đóng tab này lại</p>
                </div>
            </Form>
        )
        :
        (
            <Form tittle="Xác thực Email" login={true}>
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
            </Form>
        )
}
