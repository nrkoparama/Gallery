"use client";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CircleCheck, TriangleAlert} from "lucide-react";

// Api
import {SendMail} from "@/utils/mail";

// Components
import SocialBtnLayout from "@/app/components/layout/socialBtnLayout";
import Divider from "@/app/components/ui/divider";

// Custom functions
import {VerifyEmail} from "@/app/services/api/account";
import {randomChars} from "@/utils/randomChars";
import {setToast} from "@/utils/activeToast";
import {encodeBase64Url} from "@/utils/base64URL";

// Types
interface EmailVerifyForm {
    email: string;
    code: string;
    confirm_code: string;
}

const schema = Yup.object({
    email: Yup.string()
        .trim()
        .email("* Email không hợp lệ")
        .required("* Vui lòng nhập email"),
    code: Yup.string()
        .required("* Vui lòng nhập mã xác thực")
        .length(6, "* Vui lòng xem lại mã xác thực ( 6 kí tự )"),
    confirm_code: Yup.string()
        .required("* Vui lòng nhập mã xác thực")
        .oneOf([Yup.ref("code")], "* Mã xác thực không đúng")
});

export default function EmailVerifyPage() {
    const router = useRouter();
    const [count, setCount] = useState(60);
    const [isSent, setIsSent] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        reset,
        clearErrors,
        formState: {errors},
    } = useForm<EmailVerifyForm>({
        mode: 'all', // khi nào sẽ trigger
        resolver: yupResolver(schema),
        defaultValues: {code: randomChars({chars: "0123456789", length: 6})},
    });

    const submit = handleSubmit(async (data) => {
        const emailEncode = encodeBase64Url(data.email);
        const verifyEncode = encodeBase64Url("true");
        const res = await VerifyEmail(emailEncode);
        if (res.status === 200) {
            router.push(`/account/register?email=${emailEncode}&verify=${verifyEncode}`)
        } else {
            setToast("Xác thực email thất bại", {
                icon: <TriangleAlert className={`text-red-500`}/>,
                description: "Vui lòng kiểm tra lại email và mã xác thực",
                duration: 2000
            })
        }
    });

    const sendCode = async () => {
        const isEmailValid = await trigger("email");
        if (!isEmailValid) return;

        const email = watch("email");
        const code = randomChars({chars: "0123456789", length: 6});
        reset((prev) => ({...prev, code}));

        const response = await SendMail(email, code);
        let success = false;
        if (response.status === 200) success = true;

        setToast(success ? "Gửi mail thành công" : "Gửi mail thất bại", {
            icon: success ? <CircleCheck className={`text-green-500`}/> : <TriangleAlert className={`text-red-500`}/>,
            description: success ? "Vui lòng lấy mã xác thực qua email" : "Vui lòng kiểm tra lại email",
            duration: 2000
        });

        if (success) {
            setIsSent(true);
            setCount(60); // Reset lại đếm
        }
    };

    useEffect(() => {
        if (isSent && count > 0) {
            const timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [count, isSent]);

    return (
        <>
            <div className="min-h-screen py-14">
                <div className="max-w-[500px] mx-auto">
                    <div className="bg-white shadow-xl rounded-xl p-8">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl text-[#00009C] font-bold tracking-tight">
                                Xác thực Email
                            </h1>
                        </div>

                        <form onSubmit={submit}>
                            <div className="space-y-5">
                                {/* Email Field */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block font-medium text-gray-700 mb-2"
                                    >
                                        Email
                                    </label>
                                    <div className="flex gap-3">
                                        <input
                                            id="email"
                                            type="text"
                                            {...register("email")}
                                            onChange={() => clearErrors('email')}
                                            className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none ring-inset ${errors.email ? 'border-red-600' : `border-gray-300 focus:ring-1 focus:ring-[#0000CD]`} transition-all duration-200`}
                                        />
                                        <button
                                            type="button"
                                            onClick={sendCode}
                                            disabled={isSent && count > 0}
                                            className={`w-32 rounded-lg font-medium transition duration-200 ${
                                                isSent && count > 0
                                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    : 'bg-[#00009C] hover:bg-white text-white hover:text-[#00009C] hover:border-2 hover:border-[#00009C] hover:cursor-pointer'
                                            }`}
                                        >
                                            {isSent ? (count > 0 ? `${count}s` : `Gửi lại`) : "Gửi mã"}
                                        </button>

                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Verification Code Field */}
                                <div>
                                    <label
                                        htmlFor="confirm_code"
                                        className="block font-medium text-gray-700 mb-2"
                                    >
                                        Mã xác thực
                                    </label>
                                    <input
                                        id="confirm_code"
                                        type="text"
                                        disabled={!isSent}
                                        {...register("confirm_code")}
                                        className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none ring-inset ${errors.confirm_code ? 'border-[#FF0000]' : 'border-gray-300 focus:ring-1 focus:ring-[#0000CD]'} transition-all duration-200 ${
                                            !isSent && 'bg-gray-50 cursor-not-allowed'
                                        }`}
                                    />
                                    {errors.confirm_code && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.confirm_code.message}
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
                                        onClick={() => router.push("/pages/account/forgot-password")}
                                        className="hover:cursor-pointer"
                                    >
                                        Không tìm thấy mã ?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#00009C] hover:bg-white  text-white hover:text-[#00009C] rounded-lg  py-2.5 border-2 hover:border-[#00009C] hover:cursor-pointer"
                                >
                                    Tiếp tục
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
