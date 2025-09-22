"use client";
import Link from "next/link"
import {CircleCheck, Info, TriangleAlert} from 'lucide-react';
import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import debounce from 'lodash.debounce';
import {SoftDelete} from "@/app/services/api/account";

import {sleep} from "@/utils/delay";
import AuthorContextProvider, {useAuthor} from "@/app/components/provider/authorContext.provider";

const warningList = [
    "Bạn sẽ bị đăng xuất ngay lập tức và không thể đăng nhập vào tài khoản tới khi tài khoản được khôi phục.",
    "Bạn có 30 ngày để khôi phục lại tài khoản tính từ ngày xóa.",
    "Sau khi xóa vĩnh viễn tài khoản các dữ liệu như thông tin tài khoản, hình ảnh, bài viết... sẽ bị xóa hết và không thể khôi phục."
]

export default function DeleteAccountPage() {
    const router = useRouter();
    const {getAuthorAction} = useAuthor()
    const [activeBtn, setActiveBtn] = useState(false);
    const handleSearch = (value: string) => {
        if (value) {
            setActiveBtn(true);
            return;
        }
        setActiveBtn(false);
        return;
    }
    const debouncedHandleSearch = useCallback(debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearch(e.target.value);
    }, 300), []);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get("password") as string;

        if (password) {
            let success = false;
            const response = await SoftDelete(password);
            if (response.status === 200) {
                success = true;
                getAuthorAction();
            }

            // setToast(success ? "Xóa tài khoản thành công" : "Xóa tài khoản thất bại", {
            //     icon: success ? <CircleCheck className={`text-green-500`}/> :
            //         <TriangleAlert className={`text-red-500`}/>,
            //     description: success ? "Bạn đang được chuyển hướng về trang chủ" : response.message,
            //     duration: 2000
            // })
            await sleep(2000);
            if (success) router.push("/");
            return;
        }
    }
    useEffect(() => {
        return () => debouncedHandleSearch.cancel();
    }, [debouncedHandleSearch]);
    return (
        <AuthorContextProvider>
            <div className={`w-full py-8`}>
                <div>
                    <p className={`text-3xl font-bold my-4`}>Xóa tài khoản của bạn</p>
                    <div
                        className={`w-full bg-red-50 text-sm text-red-500  px-6 py-4 border-1 border-red-500 rounded space-y-3`}>
                        <p>Những lưu ý khi xóa tài khoản:</p>
                        {warningList.map((i, index) => (
                            <div key={index} className={`flex items-start gap-2`}>
                                <Info className={`flex-shrink-0 w-4 h-4 mt-1`}/>
                                <div className={`m-0`}>{i}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`my-8 space-y-2`}>
                    <p className={`text-2xl font-semibold`}>Xác nhận xóa tài khoản</p>
                    <p>
                        Để hoàn thành việc xóa tài khoản, bạn hãy nhập mật khẩu hiện tại và chọn vào nút đồng ý xóa tài
                        khoản phía dưới.
                    </p>
                    <Link href={`/account/setting/forgot-password`} className={`text-blue-600 hover:underline`}>Quên mật
                        khẩu ?</Link>
                </div>
                <form className={`w-[60%] flex flex-col`} onSubmit={submit}>
                    <div className={`flex flex-col space-y-3`}>
                        <label htmlFor="password">Mật khẩu hiện tại</label>
                        <input
                            id="password"
                            name="password" //dùng cho formData
                            type="password"
                            autoComplete="current-password"
                            onChange={debouncedHandleSearch}
                            placeholder="Nhập mật khẩu hiện tại của bạn..."
                            className={`w-full px-4 py-2 rounded-lg border focus:outline-none ring-inset focus:ring-1 focus:ring-[#0000CD] transition duration-200`}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!activeBtn}
                        className={`w-1/2 bg-gray-700 text-white border mt-14 py-2 rounded ${activeBtn ? "bg-red-600 hover:bg-red-700 hover:cursor-pointer" : "bg-gray-700 opacity-30 cursor-not-allowed"} transition duration-200`}>
                        Tôi đồng ý xóa tài khoản
                    </button>
                </form>
            </div>
        </AuthorContextProvider>
    )
}