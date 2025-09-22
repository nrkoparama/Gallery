"use client";
import * as Yup from "yup";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Eye, EyeClosed} from "lucide-react";
import Form from "@/app/components/ui/Form";


// Types
import type {LoginType} from "@/types/Author";

// Functions
import {activeToast} from "@/utils/activeToast";
import {signIn} from "next-auth/react";

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


export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: {errors},
    } = useForm<LoginType>({
        mode: "all",
        resolver: yupResolver(schema),
    });

    const submit = handleSubmit(async (data) => {
        try {
            const signInAction = await signIn("credentials", {
                ...data,
                redirect: false
            });

            if (signInAction?.status === 401) {
                activeToast("Đăng nhập thất bại", {
                    type: "error",
                    description: "Email hoặc mật khẩu không đúng",
                    duration: 5000
                })
            }

            router.push("/?login=true&provider=credentials")

        } catch (error) {
            console.error("Lỗi trong handleSignIn:", error);
        }
    });

    return (
        <Form tittle="Đăng nhập" login={true}>
            <form onSubmit={submit}>
                {/* Form Fields */}
                <div className={`space-y-4`}>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            {...register("email")}
                            onChange={() => clearErrors("email")}
                            className={`w-full text-gray-500 px-4 py-2.5 border rounded-lg focus:outline-none ring-inset ${
                                errors.email
                                    ? "border-red-500"
                                    : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`
                            } transition duration-200`}
                        />

                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <div className={`text-gray-700 font-medium flex justify-between items-center`}>
                            <label htmlFor="password" className="block mb-2">
                                Mật khẩu
                            </label>
                            <p onClick={() => router.push("/account/forgot-password")}
                               className={`text-[#00009C] cursor-pointer`}>Quên mật khẩu ?</p>
                        </div>


                        <div className="relative">
                            <input
                                id="password"
                                {...register("password")}
                                onChange={() => clearErrors("password")}
                                type={showPassword ? "text" : "password"}
                                className={`w-full text-gray-500 px-4 py-2.5 border rounded-lg focus:outline-none ring-inset ${
                                    errors.password
                                        ? "border-red-500"
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
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>


                    <div className="text-[#00009C] px-1 flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="cursor-pointer"
                        >
                            Trang chủ
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/account/register/verify-email")}
                            className="cursor-pointer"
                        >
                            Đăng ký
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
        </Form>
    )
}
