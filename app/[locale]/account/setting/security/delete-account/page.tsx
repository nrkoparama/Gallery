"use client";
import {Copy, Info} from "lucide-react";
import {yupResolver} from "@hookform/resolvers/yup";
import {useForm} from "react-hook-form";
import {DeleteAccountForm} from "@/types/Form";
import {SoftDelete} from "@/services/api/account";
import {activeToast} from "@/utils/activeToast";
import {useRouter} from "next/navigation";
import {softDeleteSchema} from "@/types/Yup.Schema";

const warningList = [
    "Bạn sẽ bị đăng xuất ngay lập tức và không thể đăng nhập vào tài khoản tới khi tài khoản được khôi phục lại.",
    "Bạn có 30 ngày để khôi phục lại tài khoản tính từ ngày xóa.",
    "Sau khi xóa vĩnh viễn tài khoản các dữ liệu như thông tin tài khoản, hình ảnh, bài viết... liên quan đến tài khoản sẽ bị xóa và không thể khôi phục."
]

export default function DeleteAccountPage() {
    const router = useRouter();

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<DeleteAccountForm>({
        mode: "onSubmit",
        resolver: yupResolver(softDeleteSchema),
        defaultValues: {confirmText: "Tôi muốn xóa tài khoản", reConfirm: ""}
    })

    const submit = handleSubmit(async (data) => {
        console.log(data)
        const res = await SoftDelete();
        let isSuccess = false;

        if (res.status_code === 200) isSuccess = true;
        activeToast(isSuccess ? "Xóa tài khoản thành công" : "Xóa tài khoản thất bại", {
            type: isSuccess ? "success" : "error",
            description: isSuccess ? "Đang chuyển hướng về trang chủ" : res.message
        })

        if (isSuccess) router.push("/");
    });

    const autoFill = () => {
        setValue("reConfirm", "Tôi muốn xóa tài khoản");
    }

    return (
        <div className={`w-full`}>
            <div>
                <p className={`text-3xl font-bold my-4`}>Xóa tài khoản của bạn</p>
                <div className={`w-full bg-red-50 text-red-500 px-6 py-4 border-1 border-red-500 rounded space-y-3`}>
                    <p>Những lưu ý khi xóa tài khoản:</p>
                    <div className={`space-y-4`}>
                        {warningList.map((i, index) => (
                            <div key={index} className={`flex items-start gap-3`}>
                                <Info size={20} strokeWidth={1.75} className={`flex-shrink-0 mt-0.5`}/>
                                <div>{i}</div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className={`my-8`}>
                <p className={`text-2xl font-semibold`}>Xác nhận xóa tài khoản</p>
            </div>
            <form className={`flex flex-col`} onSubmit={submit}>
                <div className={`w-[80%]`}>
                    <label htmlFor="reConfirm" className={`block text-gray-700 font-medium mb-2`}>
                        Hãy nhập &quot<span className={`font-semibold`}>Tôi muốn xóa tài khoản</span>&quot vào ô bên dưới
                    </label>
                    <div className={`flex gap-3`}>
                        <input
                            id="reConfirm"
                            type="text"
                            {...register("reConfirm")}
                            // autoComplete="current-password"
                            spellCheck={false}
                            className={`w-[60%] text-gray-500 px-4 py-2.5 border rounded-lg focus:outline-none ring-inset
                         ${errors.reConfirm
                                ? "border-red-500"
                                : "border-gray-300 focus:ring-1 focus:ring-[#0000CD]"
                            } transition duration-200`}
                        />
                        <button type="button" onClick={() => autoFill()}
                                className={`bg-gray-500/10 px-4 py-2.5 rounded-sm flex justify-center items-center gap-1  cursor-pointer`}>
                            <Copy size={16} strokeWidth={1.75}/>
                            Tự động điền
                        </button>
                    </div>

                    {errors.reConfirm && (
                        <div className={`text-sm text-red-500 mt-1`}>{errors.reConfirm.message}</div>
                    )}

                </div>

                <button
                    type="submit"
                    className={`w-[25%] text-white border mt-10 py-2 rounded-sm bg-red-700 hover:bg-red-500 cursor-pointer transition-colors duration-300`}>
                    Xác nhận
                </button>
            </form>
        </div>
    )
}