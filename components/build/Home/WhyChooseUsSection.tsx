"use client";
import React from "react";
import {ArrowDownToLine, FileSearchIcon, Forward, ImageDown, NotebookPen, ShieldCheck} from "lucide-react";

const reasons = [
    {
        title: "Ảnh chất lượng cao",
        icon: <ImageDown strokeWidth={1.75}/>,
        description: "Có thể tải và sử dụng miễn phí ảnh do các nhiếp ảnh gia trên khắp thế giới đóng góp."
    },
    {
        title: "Đăng tải ảnh",
        icon: <Forward strokeWidth={1.75}/>,
        description: "Chia sẻ phong cách chụp ảnh cũng như những kỷ niệm, trải nghiệm khó quên trong cuộc đời."
    },
    {
        title: "Đăng tải bài viết",
        icon: <NotebookPen strokeWidth={1.75}/>,
        description: "Hỗ trợ viết và đăng bài như một công cụ chuyên nghiệp, giao diện dễ dùng thân thiện với mọi người."
    },
    {
        title: "Nguồn cảm hứng",
        icon: <FileSearchIcon strokeWidth={1.75}/>,
        description: "Thông qua những tấm ảnh và bài viết, bạn có thể tìm thấy được nguồn cảm hứng cho các dự tính sắp tới của mình."
    },
    {
        title: "Lưu trữ ảnh linh hoạt",
        icon: <ArrowDownToLine strokeWidth={1.75}/>,
        description: "Hỗ trợ nhiều phương thức lưu trữ, dễ dàng truy cập và đồng bộ với nhiều thiết bị."
    },
    {
        title: "Bảo mật",
        icon: <ShieldCheck strokeWidth={1.75}/>,
        description: "Cam kết không lưu giữ thông tin người dùng cho các mục đích trái phép, đảm bảo thông tin an toàn."
    }
]

export default function WhyChooseUsSection(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={`container px-4 md:px-6 xl:px-8`} {...props}>
            <div className={`w-[90%] mx-auto flex flex-col justify-center items-center space-y-5`}>
                <h2 className={`text-xl uppercase font-semibold`}>Tại sao lại chọn Gallery ?</h2>
                <div className={`w-[90%] grid grid-cols-3 grid-rows-2 gap-6`}>
                    {reasons.map((reason, index) => (
                        <div key={index} className={`border-2 px-6 py-4 rounded-md space-y-2.5`}>
                            {reason.icon}
                            <p className={`font-semibold`}>{reason.title}</p>
                            <p className={`text-sm`}>{reason.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}