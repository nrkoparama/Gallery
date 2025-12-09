import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";
import NextAuthProvider from "@/components/provider/next-auth.provider";
import ReduxProvider from "@/components/provider/redux-toolkit.provider";
import AuthorContextProvider from "@/components/provider/authorContext.provider"
import {Toaster} from "@/components/ui/sonner";
import Header from "@/components/build/Header/Header"
import Footer from "@/components/build/Footer/Footer";

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";

export const metadata: Metadata = {
    title: "Gallery",
    description: "Website lưu trữ ảnh",
    icons: {
        icon: "./android-chrome-512x512.png"
    }
};


export default async function RootLayout({children}: Readonly<{ children: ReactNode }>) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="vi">
        <body className={`antialiased tracking-wider`}>
        <AuthorContextProvider>
            <ReduxProvider>
                <NextAuthProvider session={session}>
                    <Header/>
                    <main>{children}</main>
                    <Footer/>
                    <Toaster
                        position={`top-center`}
                        swipeDirections={["top", "right"]}
                        richColors={true}
                        duration={2000}
                    />
                </NextAuthProvider>
            </ReduxProvider>
        </AuthorContextProvider>
        </body>
        </html>
    );
}


/* Toaster props
* theme: màu background của toast
* position: vị trí hiển thị toast
* duration: thời gian hiển thị toast
* richColors: các toast default như: toast.success/error/info .... sẽ có màu
* expand: khi có nhiều toast thì hiện chồng lên nhau hay xổ ra hết, mặc định là false
* closeButton: hiện nút để tắt toast
* gap: khoảng cách giữa icon ( nếu có ) vs text
* className: thêm css
* style: thêm css
* offset: margin cho toast. Ví dụ position là top-right mà offset={20} thì toast sẽ cách top & right 20px
* mobileOffset: offset cho mobile
* dir: cách thể hiện nội dung ltr - left to right | rtl - right to left | auto - tự động điều chỉnh ( theo cách nào thì chưa biết )
* containerAriaLabel: chính là aria-label, dùng làm nội dung cho giải thích cho người khiếm khuyết
* icons: chọn icon default: success | info | warning | error | loading | close
* swipeDirections: dạng [], cho phép vuốt để xóa toast - top | bottom | right | left
* toastOptions: ???
* visibleToasts: ???
* hotkey: ???
* invert: ???
*
*
* ----------------------------------------------------------------------------------------------------------------------
* getToast(id)

    Chức năng: Lấy ra thông tin của một toast dựa trên id.

    Dùng khi: Bạn muốn kiểm tra toast đó đang ở trạng thái gì (đang hiển thị, đã đóng, nội dung gì…).

    VD:
        import { toast, getToast } from "sonner";

        const id = toast("Loading...");

        // 2 giây sau, kiểm tra toast
        setTimeout(() => {
            const info = getToast(id);
            console.log(info);    // { id: "xyz", type: "message", visible: true, title: "Loading...", ... }
        }, 2000)
* ----------------------------------------------------------------------------------------------------------------------
* getHistory()

    Chức năng: Lấy ra danh sách toàn bộ toast đã từng hiển thị trong phiên hiện tại (kể cả toast đã đóng).

    Dùng khi: Bạn muốn log lại lịch sử, debug, hoặc hiển thị lại các thông báo trước đó.

    VD:
        import { getHistory } from "sonner";

        console.log(getHistory()); // [{ id: "abc", title: "First toast", visible: false, ... },{ id: "xyz", title: "Loading...", visible: true, ... }]
* ----------------------------------------------------------------------------------------------------------------------

* */
