"use client";
import React, {useState} from "react";
import {
    Album,
    ArchiveRestore,
    CalendarClock,
    ChevronDown,
    Download,
    FlaskConical,
    HandCoins,
    MessageCircleQuestion,
    Pencil,
    Sprout,
    UserRoundPlus
} from "lucide-react";

const comparisonPlan = {
    labels: ["Cơ bản", "Nâng cao", "Cao cấp"],
    features: [
        {
            feature: "Lưu trữ ảnh",
            values: ["2 GB", "10 GB", "Không giới hạn"]
        },
        {
            feature: "Tải ảnh miễn phí chất lượng cao mỗi lần",
            values: ["1 ảnh", "1 ảnh", "Không giới hạn"]
        },
        {
            feature: "Album cá nhân",
            values: ["2 album", "10 album", "Không giới hạn"]
        },
        {
            feature: "Công cụ đăng bài",
            values: ["Cơ bản", "Nâng cao", "Tùy chỉnh theo yêu cầu"]
        },
        {
            feature: "Các tính năng khác",
            values: ["Cơ bản", "Nâng cao", "Cao cấp"]
        },
        {
            feature: "Hỗ trợ qua Fanpage",
            values: ["Có", "Có", "Có (ưu tiên)"]
        },
        {
            feature: "Sử dụng các tính năng mới",
            values: ["Không", "Có (có giới hạn)", "Có (không giới hạn)"]
        },
        {
            feature: "Trải nghiệm gói trước khi mua",
            values: ["Không", "7 ngày", "3 ngày"]
        },
        {
            feature: "Hoàn tiền",
            values: ["Không", "Có", "Có"]
        },
        {
            feature: "Thêm tài khoản",
            values: ["Không", "Có", "Có"]
        },
    ]
}

const amount = [0, 219000, 600000]
// const bills = [
//     {
//         pack: "basic",
//         price: 0,
//         discountValue: 0,
//         typeDiscount: "multiple",
//         recommend: false
//     },
//     {
//         pack: "plus",
//         price: 219000,
//         discountValue: 100000,
//         typeDiscount: "minus",
//         recommend: true
//     },
//     {
//         pack: "premium",
//         price: 600000,
//         discountValue: 100000,
//         typeDiscount: "multiple",
//         recommend: false
//     }
// ]

type Bill = "monthly" | "annual";

export default function SubscriptionSection(props: React.HTMLAttributes<HTMLDivElement>) {
    const [subscription, setSubscription] = useState<Bill>("monthly");
    const [planComparison, setPlanComparison] = useState(false);
    const hasDiscount = true;

    //  const calSubscription = () => {
    //
    // }
    return (
        <section className={`container px-4 md:px-6 xl:px-8`} {...props}>
            <div className={`flex flex-col justify-center items-center space-y-5`}>
                <h2 className={`text-xl uppercase font-semibold`}>nâng cấp tài khoản</h2>
                <div className={`w-full flex flex-col items-center space-y-5`}>
                    <div className={`p-1.5 border-2 rounded flex gap-1`}>
                        <button onClick={() => setSubscription("monthly")}
                                className={`${subscription === "monthly" ? "bg-teal-500 hover:bg-teal-500/90 text-[#F1F0E6] " : "hover:bg-gray-300/30"} px-3 py-2.5 rounded cursor-pointer`}>
                            Hàng tháng
                        </button>
                        <button onClick={() => setSubscription("annual")}
                                className={`${subscription === "annual" ? "bg-teal-500 hover:bg-teal-500/90 text-[#F1F0E6]" : "hover:bg-gray-300/30"} px-3 py-2.5 rounded cursor-pointer inline-flex items-center gap-2`}>
                            Hàng năm
                            <span
                                className={`${subscription === "annual" ? "bg-[#F1F0E6] text-teal-500" : "bg-teal-500 text-[#F1F0E6]"} text-[10px] p-1.5 rounded`}>
                                Tiết kiệm 10%
                            </span>
                        </button>
                    </div>
                    <div className={`w-full tracking-wider grid grid-cols-3 gap-6`}>
                        {/*Basic*/}
                        <div className={`py-5`}>
                            <div
                                className={`min-h-[920px] p-8 border shadow-md rounded-lg flex flex-col justify-between`}>
                                <div className={`space-y-5`}>
                                    <div>
                                        <p className={`text-2xl font-semibold`}>Cơ bản</p>
                                        <p className={`text-sm font-medium`}>Gói tài khoản cơ bản cho hệ sinh thái
                                            Gallery</p>
                                    </div>

                                    {hasDiscount && (amount[0] - 100000) > 0 ? (
                                        <p className={`text-3xl font-semibold inline-flex items-center gap-2`}>
                                      <span className={`text-xl line-through opacity-80`}>
                                        {amount[0].toLocaleString("vi-VN")}
                                    </span>
                                            {(amount[0] - 100000).toLocaleString("vi-VN")} VNĐ
                                        </p>
                                    ) : (
                                        <p className={`text-3xl font-semibold inline-flex items-center gap-2`}>
                                            {amount[0].toLocaleString("vi-VN")} VNĐ
                                        </p>
                                    )}
                                    <ul className={`text-sm space-y-6`}>
                                        <li className={`inline-flex items-start gap-4`}>
                                    <span>
                                        <ArchiveRestore size={20} strokeWidth={1.75}/>
                                    </span>
                                            Lưu trữ ảnh giới hạn (tối đa 2GB)
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Download size={20} strokeWidth={1.75}/></span>
                                            Tải xuống ảnh miễn phí với chất lượng cao
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Album size={20} strokeWidth={1.75}/></span>
                                            Album cá nhân giới hạn (2 album)
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Pencil size={20} strokeWidth={1.75}/></span>
                                            Viết và đăng bài với giao diện Editor cơ bản
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Sprout size={20} strokeWidth={1.75}/></span>
                                            Được sử dụng các tính năng cơ bản khác trong hệ sinh thái
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><MessageCircleQuestion size={20} strokeWidth={1.75}/></span>
                                            Được hỗ trợ qua Fanpage chính thức của Gallery
                                        </li>
                                    </ul>
                                </div>
                                <button className={`w-full px-2 py-2.5 bg-gray-200 rounded-full`}>
                                    Đang sử dụng
                                </button>
                            </div>
                        </div>
                        {/*Plus*/}
                        <div
                            className={`p-8 border-2 border-teal-500 shadow-md shadow-teal-70/80 rounded-lg flex flex-col justify-between`}>
                            <div className={`space-y-5`}>
                                <div>
                                    <p className={`text-2xl font-semibold`}>
                                        Nâng cao
                                        <span
                                            className={`bg-teal-500 text-xs font-normal ml-3 px-3 py-1 text-white rounded-md`}>
                                            Phổ biến
                                        </span>
                                    </p>
                                    <p className={`text-sm font-medium`}>
                                        Gói tài khoản nâng cao cho hệ sinh thái Gallery
                                    </p>
                                </div>
                                {hasDiscount && (amount[1] - 100000) > 0 ? (
                                    <p className={`text-3xl font-semibold inline-flex items-center gap-2`}>
                                      <span className={`text-xl line-through opacity-80`}>
                                        {amount[1].toLocaleString("vi-VN")}
                                    </span>
                                        {(amount[1] - 100000).toLocaleString("vi-VN")} VNĐ
                                    </p>
                                ) : (
                                    <p className={`text-3xl font-semibold inline-flex items-center gap-2`}>
                                        {amount[1].toLocaleString("vi-VN")} VNĐ
                                    </p>
                                )}
                                <ul className={`text-sm space-y-6`}>
                                    <li className={`bg-violet-500/10 text-violet-500 text-center py-3 border-[2px] border-violet-500 border-dotted rounded-md `}>
                                        Các tính năng của gói cơ bản được nâng cấp
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                    <span>
                                        <ArchiveRestore size={20} strokeWidth={1.75}/>
                                    </span>
                                        Lưu trữ ảnh giới hạn (tối đa 10GB)
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><Download size={20} strokeWidth={1.75}/></span>
                                        Tải xuống hàng loạt ảnh miễn phí với chất lượng cao
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><Album size={20} strokeWidth={1.75}/></span>
                                        Album cá nhân mở rộng (10 album)
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><Pencil size={20} strokeWidth={1.75}/></span>
                                        Viết và đăng bài với giao diện Editor nâng cao
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><Sprout size={20} strokeWidth={1.75}/></span>
                                        Được sử dụng các tính năng nâng cao khác trong hệ sinh thái
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><MessageCircleQuestion size={20} strokeWidth={1.75}/></span>
                                        Được hỗ trợ qua Fanpage chính thức của Gallery
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><FlaskConical size={20} strokeWidth={1.75}/></span>
                                        Được sử dụng các tính năng mới (có giới hạn) trước so với gói cơ bản
                                    </li>

                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><CalendarClock size={20} strokeWidth={1.75}/></span>
                                        Được trải nghiệm miễn phí 7 ngày trước. Sau đó mới quyết định đăng ký gói hay
                                        không
                                    </li>
                                    <li className={`inline-flex items-start gap-4`}>
                                        <span><HandCoins size={20} strokeWidth={1.75}/></span>
                                        Có thể hủy gói bất cứ lúc nào và hoàn lại tiền dựa vào mức độ sử dụng gói
                                    </li>
                                </ul>
                            </div>
                            <button className={`w-full px-2 py-2.5 bg-gray-200 rounded-full cursor-not-allowed`}>
                                Sắp có
                            </button>
                        </div>
                        {/*Premium*/}
                        <div className={`py-5`}>
                            <div
                                className={`min-h-[920px] p-8 border shadow-md rounded-lg flex flex-col justify-between`}>
                                <div className={`space-y-5`}>
                                    <div>
                                        <p className={`text-2xl font-semibold`}>Cao cấp</p>
                                        <p className={`text-sm font-medium`}>
                                            Gói tài khoản cao cấp cho hệ sinh thái Gallery
                                        </p>
                                    </div>
                                    {hasDiscount && (amount[2] - 100000) > 0 ? (
                                        <p className={`text-3xl font-semibold inline-flex items-center gap-2`}>
                                      <span className={`text-xl line-through opacity-80`}>
                                        {amount[2].toLocaleString("vi-VN")}
                                    </span>
                                            {(amount[2] - 100000).toLocaleString("vi-VN")} VNĐ
                                        </p>
                                    ) : (
                                        <p className={`text-3xl font-semibold inline-flex items-center gap-2`}>
                                            {amount[2].toLocaleString("vi-VN")} VNĐ
                                        </p>
                                    )}
                                    <ul className={`text-sm space-y-6`}>
                                        <li className={`bg-violet-500/10 text-violet-500 text-center py-3 border-[2px] border-violet-500 border-dotted rounded-md`}>
                                            Các tính năng sử dụng ở mức cao nhất
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                    <span>
                                        <ArchiveRestore size={20} strokeWidth={1.75}/>
                                    </span>
                                            Lưu trữ ảnh không giới hạn
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Download size={20} strokeWidth={1.75}/></span>
                                            Tải xuống hàng loạt ảnh miễn phí với chất lượng cao
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Album size={20} strokeWidth={1.75}/></span>
                                            Album cá nhân không giới hạn
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Pencil size={20} strokeWidth={1.75}/></span>
                                            Viết và đăng bài với giao diện Editor nâng cao, có các plugin hỗ trợ SEO. Hỗ
                                            trợ
                                            tạo
                                            plugin theo yêu cầu
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><Sprout size={20} strokeWidth={1.75}/></span>
                                            Được sử dụng các tính năng cao cấp khác trong hệ sinh thái
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><MessageCircleQuestion size={20} strokeWidth={1.75}/></span>
                                            Được ưu tiên hỗ trợ qua Fanpage chính thức của Gallery
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><FlaskConical size={20} strokeWidth={1.75}/></span>
                                            Được sử dụng các tính năng mới (không giới hạn) trước
                                        </li>

                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><CalendarClock size={20} strokeWidth={1.75}/></span>
                                            Được trải nghiệm miễn phí 3 ngày trước. Sau đó mới quyết định đăng ký gói
                                            hay không
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><HandCoins size={20} strokeWidth={1.75}/></span>
                                            Có thể hủy gói bất cứ lúc nào và hoàn lại tiền dựa vào mức độ sử dụng gói
                                        </li>
                                        <li className={`inline-flex items-start gap-4`}>
                                            <span><UserRoundPlus size={20} strokeWidth={1.75}/></span>
                                            Có thể thêm tài khoản khác vào sử dụng chung
                                        </li>
                                    </ul>
                                </div>
                                <button className={`w-full px-2 py-2.5 bg-gray-200 rounded-full cursor-not-allowed`}>
                                    Sắp có
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setPlanComparison(!planComparison)}
                        className={`text-center inline-flex items-center gap-1 cursor-pointer`}>
                        Xem so sánh
                        <span>
                            <ChevronDown size={20} strokeWidth={1.75}
                                         className={`${planComparison ? "rotate-0" : "-rotate-180"} transition-transform duration-500`}/>
                        </span>
                    </button>
                </div>
                <div className={`${planComparison ? "block" : "hidden"}`}>
                    <div className={`w-[80%] mx-auto flex flex-col justify-center items-center space-y-5`}>
                        <p className={`text-xl font-semibold`}>So sánh tính năng các gói tài khoản</p>
                        <div className={`w-full overflow-x-auto`}>
                            <table className={`w-full table-fixed`}>
                                <thead>
                                <tr className={`text-center border-b border-gray-200`}>
                                    <th className={`w-[40%] text-left p-4`}>Tính năng</th>
                                    {comparisonPlan.labels.map((plan, index) => (
                                        <th key={index} className={`w-[20%] p-4`}>{plan}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {comparisonPlan.features.map((f, index) => (
                                    <tr key={index} className={`text-center border-b border-gray-200`}>
                                        <td className={`text-left p-4`}>{f.feature}</td>
                                        {f.values.map((v, index) => (
                                            <td key={index} className={`p-4`}>{v}</td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}