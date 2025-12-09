"use client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// Api
import {Register} from "@/services/api/account";

// Custom functions
import {activeToast} from "@/utils/activeToast";
import {sleep} from "@/utils/delay";
import {decodeBase64Url} from "@/utils/base64URL";

// Components
import {Eye, EyeClosed} from "lucide-react";
import Form from "@/components/build/Form";

// Types
import type {RegisterForm} from "@/types/Form";
import {registerSchema} from "@/types/Yup.Schema";


export default function RegisterPage() {
    const router = useRouter();
    const params = useSearchParams();
    const emailEncode = params.get("email");
    const token = params.get("token");
    const [showPassword, setShowPassword] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const {register, handleSubmit, clearErrors, reset, formState: {errors}} = useForm<RegisterForm>({
        mode: 'onSubmit',
        resolver: yupResolver(registerSchema),
        defaultValues: {email: emailEncode ? emailEncode : "", token: token ? token : null},
    });

    const submit = handleSubmit(async (data) => {
        const res = await Register(data);
        let isSuccess = false;

        if (res.status_code === 201) {
            localStorage.setItem("_irs", JSON.stringify(true));
            isSuccess = true;
        }

        activeToast(isSuccess ? "Đăng ký tài khoản thành công" : "Đăng ký tài khoản thất bại", {
            type: isSuccess ? "success" : "error",
            description: isSuccess ? "Đang chuyển hướng sang trang đăng nhập" : res.message,
        })

        await sleep(3000);
        if (isSuccess) return router.push("/account/login");
        return;
    })

    useEffect(() => {
        const setEmail = async () => {
            if (!emailEncode || !token) {

                activeToast("Xác thực tài khoản thất bại", {
                    type: "error",
                    description: "Vui lòng xác thực lại email !"
                })

                setTimeout(() => {
                    router.push("/account/register/verify-email");
                }, 3000);
            } else {
                reset({email: decodeBase64Url(emailEncode), token})
            }
        }
        setEmail();
    }, [emailEncode, router, reset,token]);

    return (
        <Form tittle="Đăng ký" login={true}>
            <form onSubmit={submit}>
                <div className={`space-y-4`}>
                    {/* Name */}
                    <div className="grid grid-cols-2 xl:gap-5">
                        {/* First Name */}
                        <div className={`col-span-2 xl:col-span-1`}>
                            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                                Họ <span className={`text-red-500`}>*</span>
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                {...register("firstName")}
                                onChange={() => clearErrors('firstName')}
                                className={`w-full text-gray-500 px-4 py-2.5 border rounded-lg focus:outline-none ring-inset ${errors.firstName ? 'border-red-500' : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition duration-200`}
                            />
                            {errors.firstName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.firstName.message}
                                </p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div className={`col-span-2 xl:col-span-1`}>
                            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
                                Tên <span className={`text-red-500`}>*</span>
                            </label>
                            <input
                                id="lastName"
                                type="text"
                                {...register("lastName")}
                                onChange={() => clearErrors('lastName')}
                                className={`w-full text-gray-500 px-4 py-2.5 border rounded-lg focus:outline-none ring-inset ${errors.lastName ? 'border-red-500' : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition duration-200`}
                            />
                            {errors.lastName && (
                                <p className="text-sm text-red-500 mt-1">
                                    {errors.lastName.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email <span className={`text-red-500`}>*</span>
                        </label>
                        <input
                            id="email"
                            type="text"
                            disabled={true}
                            {...register("email")}
                            className="w-full bg-gray-200 text-gray-400  px-4 py-2.5 border rounded-lg cursor-not-allowed"
                        />
                    </div>

                    {/* Token Field */}
                    <div className={`hidden`}>
                        <label htmlFor="token" className="block text-gray-700 font-medium mb-2">
                            Mã xác thực <span className={`text-red-500`}>*</span>
                        </label>
                        <input
                            id="token"
                            type="text"
                            disabled={true}
                            {...register("token")}
                            className="w-full bg-gray-200 text-gray-400  px-4 py-2.5 border rounded-lg cursor-not-allowed"
                        />
                    </div>

                    {/* Password Field */}
                    <div>

                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Mật khẩu <span className={`text-red-500`}>*</span>
                        </label>

                        <div className="relative">

                            <input
                                id="password"
                                {...register("password")}
                                onChange={() => clearErrors('password')}
                                type={showPassword ? "text" : "password"}
                                className={`w-full text-gray-500 px-4 py-2.5 border rounded-lg focus:outline-none ring-inset ${errors.password ? 'border-red-500' : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition duration-200`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                            >
                                {showPassword ? (
                                    <Eye size={20} strokeWidth={1.5} className={`text-[#00009C]`}/>
                                ) : (
                                    <EyeClosed size={20} strokeWidth={1.5}
                                               className={`text-gray-400 hover:text-[#00009C]`}/>
                                )}
                            </button>

                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Terms */}
                    <div className="flex items-start gap-2">

                        <input
                            type="checkbox"
                            id="confirmTerms"
                            onChange={(e) => setIsTermsAccepted(e.target.checked)}
                            className="w-5 h-5 mt-1 cursor-pointer"
                        />

                        <label htmlFor="confirmTerms" className="text-sm cursor-pointer">

                            Tôi đồng ý với{" "}

                            <span onClick={() => router.push("/privacy")}
                                  className="font-bold text-[#00009C] underline">
                                            Chính sách bảo mật
                                        </span>

                            {" "} và {" "}

                            <span onClick={() => router.push("/terms")}
                                  className="font-bold text-[#00009C] underline">
                                            Điều khoản sử dụng
                                        </span>

                            {" "}của Gallery.

                        </label>

                    </div>

                    {/* Submit Button */}
                    <button type="submit" disabled={!isTermsAccepted}
                            className={`w-full bg-[#00009C] text-white py-2.5 border-2 rounded-lg ${!isTermsAccepted ? "cursor-not-allowed" : "hover:bg-white hover:text-[#00009C] hover:border-[#00009C] cursor-pointer"}`}>
                        Đăng ký
                    </button>

                </div>
            </form>
        </Form>
    )
}
