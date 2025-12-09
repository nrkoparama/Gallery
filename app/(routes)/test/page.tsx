import React from "react";

export default function TestPage() {
    return <div className={`min-h-screen`}>
        <div className={`w-[90%] min-h-[100px] mt-20 mx-auto border-2 p-4`}>
            <div className={`border-b-2`}>
                <h2 className={`text-3xl`}>Màu chữ</h2>
                <div className={`my-4 flex flex-col gap-4`}>
                    <p className={`text-[#006666]`}>Đây là mô tả dùng để test hiệu ứng css ( đậm #006666 )</p>
                    <p className={`text-[#008080]`}>Đây là mô tả dùng để test hiệu ứng css ( cơ bản #008080 )</p>
                    <p className={`text-[#33A3A3]`}>Đây là mô tả dùng để test hiệu ứng css ( nhạt #33A3A3 )</p>
                </div>
            </div>

            <div className={`mt-4 border-b-2`}>
                <h2 className={`text-3xl`}>Cỡ chữ</h2>
                {/*<div className={`my-4 flex flex-col gap-4`}>*/}
                {/*    <p className={`text-sm`}>Cỡ chữ ( sm - 14 px )</p>*/}
                {/*    <p className={`text-[#008080]`}>Đây là mô tả dùng để test hiệu ứng css ( cơ bản #008080 )</p>*/}
                {/*    <p className={`text-[#33A3A3]`}>Đây là mô tả dùng để test hiệu ứng css ( nhạt #33A3A3 )</p>*/}
                {/*</div>*/}
                <div className={`w-full overflow-x-auto`}>
                    <table className={`w-full table-fixed`}>
                        <thead>
                        <tr className={`border-b border-gray-200`}>
                            <th className={`w-[20%] text-left p-4`}>Kích thước</th>
                            <th className={`w-[20%] text-left p-4`}>Bold</th>
                            <th className={`w-[20%] text-left p-4`}>SemiBold</th>
                            <th className={`w-[20%] text-left p-4`}>Medium</th>
                            <th className={`w-[20%] text-left p-4`}>Base</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>

                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`pb-2 border-b-2`}>
                <h1>text</h1>
                <div className={`grid grid-cols-3`}>
                    {/*Neutral*/}
                    {/*900*/}
                    <p className={`text-[#0F172A]`}>Tiêu đề đậm</p>
                    {/*800*/}
                    <p className={`text-[#1E293B]`}>Mô tả đậm</p>
                    {/*600*/}
                    <p className={`text-[#475569]`}>Mô tả phụ</p>
                    {/*400*/}
                    <p className={`text-[#94A3B8]`}>Placeholder</p>
                    {/*200*/}
                    <p className={`text-[#E2E8F0]`}>Border</p>
                    {/*50*/}
                    <p className={`text-[#F8FAFC]`}>Background chính</p>
                    {/*Success*/}
                    <p className={`text-[#2ECC71]`}>Success</p>
                    {/*Warning*/}
                    <p className={`text-[#F39C12]`}>Warning</p>
                    {/*Error*/}
                    <p className={`text-[#E74C3C]`}>Error</p>
                </div>
            </div>

        </div>
    </div>
}