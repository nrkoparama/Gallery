// Cần làm 1 bản không có text ở giữa
import React from "react";

export default function Divider(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="flex items-center gap-3 my-4" {...props}>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
            <span className="text-gray-500">hoặc</span>
            <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>
    )
}