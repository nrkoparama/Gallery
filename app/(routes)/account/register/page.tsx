"use client";
import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Eye, EyeClosed} from "lucide-react";
import Form from "@/app/components/ui/Form";

// Api
import {Register} from "@/app/services/api/account";

// Custom functions
import {activeToast} from "@/utils/activeToast";
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
    const params = useSearchParams();
    const emailEncode = params.get("email");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        watch,
        reset,
        formState: {errors},
    } = useForm<RegisterForm>({
        mode: 'all',
        resolver: yupResolver(schema),
        defaultValues: {email: ""},
    });

    const submit = handleSubmit(async (data) => {

        const res = await Register(data);
        console.log(res)

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
            if (!emailEncode) {

                activeToast("Xác thực tài khoản thất bại", {
                    type: "error",
                    description: "Vui lòng xác thực lại email !"
                })

                setTimeout(() => {
                    router.push("/account/register/verify-email");
                }, 4000);
            } else {
                reset({email: decodeBase64Url(emailEncode)})
            }
        }
        setEmail();
    }, [emailEncode, router, reset]);

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
                            value={watch("email")}
                            disabled
                            {...register("email")}
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
                            onChange={(e) => setIsSubmitting(e.target.checked)}
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
                    <button type="submit" disabled={!isSubmitting}
                            className={`w-full bg-[#00009C] text-white py-2.5 border-2 rounded-lg ${!isSubmitting ? "cursor-not-allowed" : "hover:bg-white hover:text-[#00009C] hover:border-[#00009C] cursor-pointer"}`}>
                        Đăng ký
                    </button>

                </div>
            </form>
        </Form>
    )
}
