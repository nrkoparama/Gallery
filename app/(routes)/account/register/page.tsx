"use client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CircleCheck, Eye, EyeClosed, TriangleAlert} from "lucide-react";

// Api
import {Register} from "@/app/services/api/account";

// Components
import SocialBtnLayout from "@/app/components/layout/socialBtnLayout";
import Divider from "@/app/components/ui/divider";

// Custom functions
import {setToast} from "@/utils/activeToast";
import {sleep} from "@/utils/delay";
import {decodeBase64Url} from "@/utils/base64URL";

// Types
import type {Author} from "@/types/Author";

type RegisterForm = Pick<Author, 'firstName' | 'lastName' | 'email' | 'password'> // chỉ lấy những trường này từ Author;
const schema = Yup.object().shape({
    firstName: Yup.string()
        .required("* Vui lòng nhập họ")
        .trim()
        .min(1, "* Tối thiểu 1 kí tự")
        .max(10, "* Tối đa 10 kí tự"),
    lastName: Yup.string()
        .required("* Vui lòng nhập tên")
        .trim()
        .min(1, "* Tối thiểu 1 kí tự")
        .max(10, "* Tối đa 10 kí tự"),
    email: Yup.string()
        .required("* Vui lòng nhập email")
        .trim()
        .email("* Email không hợp lệ"),
    password: Yup.string()
        .required("* Vui lòng nhập mật khẩu")
        .trim()
        .min(8, "* Mật khẩu tối thiểu 8 kí tự")
        .matches(
            /^[A-Z](?=.*\d)(?=.*[@$!%*?&]).{7,}$/,
            "* Mật khẩu phải bắt đầu bằng chữ in hoa, chứa ít nhất một chữ số và một ký tự đặc biệt"
        ),
});

export default function RegisterPage() {
    const router = useRouter();
    const search = useSearchParams();
    const emailEncode = search.get("email");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        reset,
        formState: {errors},
    } = useForm<RegisterForm>({
        mode: 'all',
        resolver: yupResolver(schema),
        defaultValues: {email},
    });

    const submit = handleSubmit(async (data) => {
        const response = await Register({...data});
        let success = false;
        if (response.status === 200) success = true;

        setToast(success ? "Đăng ký tài khoản thành công" : "Đăng ký tài khoản thất bại", {
            icon: success ? <CircleCheck className={`text-green-500`}/> : <TriangleAlert className={`text-red-500`}/>,
            description: response.message,
            duration: 2000
        })

        await sleep(3000);
        if (success) return router.push("/account/login");
        return;
    })

    useEffect(() => {
        const setE = async () => {
            if (!emailEncode) {
                setToast("Email không hợp lệ", {
                    icon: <TriangleAlert className={`text-red-500`}/>,
                    description: "Đang chuyển hướng về trang xác thực email",
                    duration: 2000
                });
                await sleep(3000);
                router.push("/account/register/email-verify");
            } else {
                setEmail(decodeBase64Url(emailEncode));
            }
        }
        setE();
    }, [emailEncode, router]);

    useEffect(() => {
        if (email) {
            reset({email});
        }
    }, [email, reset]);
    return (
        <>
            <div className={`min-h-screen py-14 `}>
                <div className="max-w-[500px] mx-auto">
                    <div className="bg-white shadow-xl rounded-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-[#00009C] tracking-tight">
                                Đăng ký
                            </h1>
                        </div>

                        <form onSubmit={submit}>
                            <div className={`space-y-5`}>
                                {/* Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block font-medium text-gray-700 mb-1">
                                            Họ
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            {...register("firstName")}
                                            onChange={() => clearErrors('firstName')}
                                            className={`w-full text-gray-500 px-4 py-2.5 rounded-lg border focus:outline-none ring-inset ${errors.firstName ? 'border-red-600' : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition duration-200`}
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.firstName.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label htmlFor="lastName"
                                               className="block font-medium text-gray-700 mb-1">
                                            Tên
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            {...register("lastName")}
                                            onChange={() => clearErrors('lastName')}
                                            className={`w-full text-gray-500 px-4 py-2.5 rounded-lg border focus:outline-none ring-inset ${errors.lastName ? 'border-red-600' : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition duration-200`}
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.lastName.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        value={email}
                                        disabled
                                        {...register("email")}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-500 bg-gray-50 cursor-not-allowed"
                                    />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                                        Mật khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            {...register("password")}
                                            onChange={() => clearErrors('password')}
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full text-gray-500 px-4 py-2.5 rounded-lg border focus:outline-none ring-inset ${errors.password ? 'border-red-600' : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition duration-200`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <Eye size={20} strokeWidth={1.5} className={`text-[#00009C] `}/>
                                            ) : (
                                                <EyeClosed size={20} strokeWidth={1.5}
                                                           className={`text-gray-400 hover:text-[#00009C]`}/>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Terms */}
                                <div className="flex items-start gap-2">
                                    <input
                                        type="checkbox"
                                        id="confirmTerms"
                                        onChange={(e) => setIsSubmitting(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-gray-300 duration-200 cursor-pointer"
                                    />
                                    <label
                                        htmlFor="confirmTerms"
                                        className="text-sm cursor-pointer"
                                    >
                                        Tôi đồng ý với{" "}
                                        <span
                                            onClick={() => router.push("/pages/privacy")}
                                            className="font-semibold text-[#00009C] underline"
                                        >
                                            Chính sách bảo mật và Điều khoản sử dụng
                                        </span>{" "}
                                        của Gallery.
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={!isSubmitting}
                                    className={`w-full bg-[#00009C] text-white rounded-lg py-2.5 border-2 ${!isSubmitting ? 'hover:cursor-not-allowed' : 'hover:bg-white hover:text-[#00009C] hover:border-[#00009C] hover:cursor-pointer'}`}
                                >
                                    Đăng ký
                                </button>

                            </div>
                        </form>

                        {/*Divider*/}
                        <Divider/>

                        {/*Social buttons*/}
                        <SocialBtnLayout/>
                    </div>
                </div>
            </div>
        </>

    );
}
