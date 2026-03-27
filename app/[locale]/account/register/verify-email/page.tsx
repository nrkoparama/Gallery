"use client";
import Link from "next/link";
import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

// Api
import {SendMail} from "@/services/api/mail";

// Custom functions
import {activeToast} from "@/utils/activeToast";
import {sleep} from "@/utils/delay";

// Components
import FormLayout from "@/components/build/FormLayout";
import {InputText} from "@/components/build/Input";
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
            duration: 3000
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
        const syncRegisterState = async () => {
            const state = localStorage.getItem("_irs");
            // Nếu chưa set state hoặc state === true
            if (!state) {
                localStorage.setItem("_irs", JSON.stringify(false));
            } else if (JSON.parse(state) === true) {
                localStorage.removeItem("_irs"); // xóa local state
                setIsRegisterSuccess(JSON.parse(state));
                await sleep(10000);
                router.push(`/?redirect=register&new=false`);
            }
        }

        const initialSyncTimeOut = setTimeout(syncRegisterState, 5000);

        window.addEventListener("storage", syncRegisterState);

        return () => {
            clearTimeout(initialSyncTimeOut);
            window.removeEventListener("storage", syncRegisterState);
        }
    }, [router]);

    return isRegisterSuccess ?
        (
            <div className={`min-h-screen text-[#008080] flex flex-col justify-center items-center gap-8`}>
                <Image
                    src={"/assets/icons/cat.png"}
                    alt={"cat.png"}
                    width={360}
                    height={360}
                    priority
                />
                <h1 className={`text-3xl font-semibold`}> Đăng ký tài khoản thành công !</h1>
                <p className={``}>Đang chuyển hướng về trang chủ</p>
            </div>
        ) : (
            <FormLayout title="Xác thực Email" thirdPartyLogin={true}>
                <form onSubmit={submit}>
                    <div className={`space-y-4`}>
                        {/* Email Field */}
                        <InputText
                            id={"email"}
                            label={"Email"}
                            isRequire={true}
                            errorMessage={errors.email?.message}
                            onChange={() => clearErrors("email")}
                            register={register("email")}
                        />

                        <div className="text-[#00009C] px-1 flex justify-between items-center">
                            <button type="button" className="hover:cursor-pointer">
                                <Link href={"/"}>
                                    Trang chủ
                                </Link>
                            </button>
                            <button type="button" className="hover:cursor-pointer">
                                <Link href={"/account/login"}>
                                    Đăng nhập
                                </Link>
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSent && count > 0}
                            className={`w-full bg-[#00009C] py-2.5 rounded-sm border-2 ${isSent && count > 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "hover:bg-white text-white hover:text-[#00009C] hover:border-[#00009C] cursor-pointer"}`}>
                            {isSent ? (count > 0 ? `${count}s` : "Xác thực lại") : "Xác thực"}
                        </button>
                    </div>

                </form>
            </FormLayout>
        )
}
