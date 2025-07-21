"use client";
import * as Yup from "yup";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CircleCheck, Eye, EyeClosed, TriangleAlert} from "lucide-react";

// Components
import SocialBtnLayout from "@/app/components/layout/socialBtnLayout";
import Divider from "@/app/components/ui/divider";

import type {Author} from "@/types/Author";
import {Login} from "@/app/services/api/account";
import {setToast} from "@/utils/activeToast";
import {sleep} from "@/utils/delay";
import {updateAccountState} from "@/redux/slices/account";
import {setCookieCSR} from "@/utils/cookie";

type LoginForm = Pick<Author, "email" | "password">; // chỉ lấy những trường này từ Author;
const schema = Yup.object().shape({
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

export default function Register() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: {errors},
    } = useForm<LoginForm>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const submit = handleSubmit(async (data) => {
        const response = await Login({...data});
        let success = false;
        if (response.status === 200) {
            setCookieCSR("lg_", JSON.stringify({i: response.data.authorId, r: response.data.role}), 0);
            dispatch(
                updateAccountState({
                    id: response.data.authorId,
                    role: response.data.role,
                    login: true,
                })
            );
            success = true;
        }
        setToast(success ? "Đăng nhập thành công" : "Đăng nhập thất bại", {
            icon: success ? (
                <CircleCheck className={`text-green-500`}/>
            ) : (
                <TriangleAlert className={`text-red-500`}/>
            ),
            description: success
                ? "Bạn đang được chuyển về trang chủ"
                : response?.message,
            duration: 2000,
        });
        await sleep(2000);
        if (success) return router.push("/");
        return;
    });

    return (
        <>
            <div className={`min-h-screen py-14 `}>
                <div className="max-w-[500px] mx-auto">
                    <div className="bg-white shadow-xl rounded-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-[#00009C] tracking-tight">
                                Đăng nhập
                            </h1>
                        </div>

                        <form onSubmit={submit}>
                            {/* Form Fields */}
                            <div className={`space-y-5`}>
                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block font-medium text-gray-700 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="text"
                                        {...register("email")}
                                        onChange={() => clearErrors("email")}
                                        className={`w-full text-gray-500 px-4 py-2.5 rounded-lg border focus:outline-none ring-inset ${
                                            errors.email
                                                ? "border-red-600"
                                                : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`
                                        } transition duration-200`}
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block font-medium text-gray-700 mb-1"
                                    >
                                        Mật khẩu
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            {...register("password")}
                                            onChange={() => clearErrors("password")}
                                            type={showPassword ? "text" : "password"}
                                            className={`w-full text-gray-500 px-4 py-2.5 rounded-lg border focus:outline-none ring-inset ${
                                                errors.password
                                                    ? "border-red-600"
                                                    : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`
                                            } transition duration-200`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors cursor-pointer"
                                        >
                                            {showPassword ? (
                                                <Eye
                                                    size={20}
                                                    strokeWidth={1.5}
                                                    className={`text-[#00009C] `}
                                                />
                                            ) : (
                                                <EyeClosed
                                                    size={20}
                                                    strokeWidth={1.5}
                                                    className={`text-gray-400 hover:text-[#00009C]`}
                                                />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Navigation Links */}
                                <div className="text-[#00009C] flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => router.push("/")}
                                        className=" hover:cursor-pointer"
                                    >
                                        Trang chủ
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            router.push("/pages/account/forgot-password")
                                        }
                                        className="hover:cursor-pointer"
                                    >
                                        Quên mật khẩu ?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className={`w-full bg-[#00009C] text-white rounded-lg py-2.5 border-2 hover:bg-white hover:text-[#00009C] hover:border-[#00009C] hover:cursor-pointer`}
                                >
                                    Đăng nhập
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
