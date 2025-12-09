"use client";
export default function Typography() {
    return (
        <section className={`container px-4 md:px-6 xl:px-6 min-h-screen`}>
            <section
                className={`w-[80%] bg-blue-400/10 tracking-wider mx-auto my-10 px-6 py-6 border-2 border-dashed border-indigo-800 rounded-md`}>
                <h2 className={`text-2xl font-semibold`}>Phông chữ</h2>
                <ul className={`mt-4 space-y-3`}>
                    <li>Be Vietnam Pro ( sans-serif ) - Đây là ví dụ sử dụng phông chữ Be Vietnam Pro</li>
                </ul>
            </section>

            <section
                className={`w-[80%] bg-blue-400/10 mx-auto my-10 px-6 py-4 border-2 border-dashed border-indigo-800 rounded-md`}>
                <h2 className={`text-2xl font-semibold`}>Kích cỡ chữ & Độ đậm</h2>
                <ul className={`mt-4 space-y-3`}>
                    <li className={`text-3xl font-semibold`}>Tiêu đề vừa - 3xl (30px) - semibold (600)</li>
                    <li className={`text-xl font-semibold`}>Tiêu đề - xl (20px) - semibold (600)</li>
                    <li className={`text-base font-normal`}>Cơ bản - base (16px) - normal (400)</li>
                    <li className={`text-sm font-normal`}>Chú thích - sm (14px) - normal (400)</li>
                </ul>
            </section>

            <section
                className={`w-[80%] bg-blue-400/10 mx-auto my-10 px-6 py-4 border-2 border-dashed border-indigo-800 rounded-md`}>
                <h2 className={`text-2xl font-semibold`}>Màu sắc</h2>
                <div className={`mt-4 flex flex-col gap-10`}>
                    <div className={`flex items-center gap-5`}>
                        <div className={`w-16 h-16 bg-[#F5F5F5] border rounded shadow`}></div>
                        <p className={`mt-2`}>Màu nền - #F5F5F5</p>
                    </div>
                    <div className={`flex items-center gap-5`}>
                        <div title={`text-white`} className={`w-16 h-16 bg-[#FFFFFF] border rounded shadow`}></div>
                        <p className={`mt-2`}>Màu nền ( phụ ) - #FFFFFF</p>
                    </div>
                    <div className={`flex items-center gap-5`}>
                        <div title={`text-gray-700`} className={`w-16 h-16 bg-[#374151] border rounded shadow`}></div>
                        <p className={`text-[#374151] mt-2`}>Màu chữ - #374151</p>
                    </div>
                    <div className={`flex items-center gap-5`}>
                        <div title={`text-gray-500`} className={`w-16 h-16 bg-[#6b7280] border rounded shadow`}></div>
                        <p className={`text-[#6b7280] mt-2`}>Màu chữ ( nhạt ) - #6b7280</p>
                    </div>
                    <div className={`flex items-center gap-5`}>
                        <div title={`text-indigo-800`} className={`w-16 h-16 bg-[#3730a3] border rounded shadow`}></div>
                        <p className={`text-[#3730a3] mt-2`}>Màu chữ ( đường dẫn ) - #3730a3</p>
                    </div>

                    <div className={`flex items-center gap-5`}>
                        <div title={`text-teal-500`} className={`w-16 h-16 bg-[#14b8a6] border rounded shadow`}></div>
                        <p className={`text-[#14b8a6] mt-2`}>Thành công - #14b8a6</p>
                    </div>

                    <div className={`flex items-center gap-5`}>
                        <div title={`text-rose-500`} className={`w-16 h-16 bg-[#f43f5e] border rounded shadow`}></div>
                        <p className={`text-[#f43f5e] mt-2`}>Lỗi - #f43f5e</p>
                    </div>

                    <div className={`flex items-center gap-5`}>
                        <div title={`text-sky-500`} className={`w-16 h-16 bg-[#0ea5e9] border rounded shadow`}></div>
                        <p className={`text-[#0ea5e9] mt-2`}>Thông báo - #0ea5e9</p>
                    </div>

                    <div className={`flex items-center gap-5`}>
                        <div title={`text-yellow-500`} className={`w-16 h-16 bg-[#eab308] border rounded shadow`}></div>
                        <p className={`text-[#eab308] mt-2`}>Cảnh báo - #eab308</p>
                    </div>
                </div>
            </section>
        </section>

    )
}