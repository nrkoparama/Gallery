"use client";
import Image from "next/image";
import Link from "next/link";

const startYear = 2024;
const currentYear = (new Date()).getFullYear();
// const socials = [
//     {
//         provider: "Facebook",
//         iconName: "negative-facebook.png",
//         secure_url: "",
//         redirect: "https://www.facebook.com/tandat1231"
//     },
//     {
//         provider: "Instagram",
//         iconName: "negative-instagram.png",
//         secure_url: "",
//         redirect: "https://www.facebook.com/tandat1231"
//     },
//     {provider: "X", iconName: "negative-x.png", secure_url: "", redirect: "https://www.facebook.com/tandat1231"},
// ]
const navigations = [
    {
        title: "MỤC LỤC TRANG",
        links: [
            {subtitle: "Thư viện ảnh", path: "http://localhost:3000"},
            {subtitle: "Bài viết", path: "http://localhost:3000"},
            {subtitle: "Tài khoản", path: "http://localhost:3000"},
            {subtitle: "Q & A ?", path: "http://localhost:3000"}
        ]
    },
    {
        title: "THEO DÕI CHÚNG TÔI",
        links: [
            {subtitle: "Facebook", path: "https://www.facebook.com/"},
            {subtitle: "Instagram", path: "https://www.instagram.com/"},
            {subtitle: "X", path: "https://x.com/"}
        ]
    },
    {
        title: "ĐIỀU KHOẢN & QUYỀN RIÊNG TƯ",
        links: [
            {subtitle: "Chính sách bảo mật", path: "http://localhost:3000"},
            {subtitle: "Quản lý cookies", path: "http://localhost:3000"}
        ]
    },
]
/* ------------------------------------ Tailwind css ------------------------------------

    1. grid grid-rows/cols-{value} => grid-rows/cols-{value}

       Không cần phải thêm grid vào grid-rows/cols-2 thì tailwind
       sẽ tự thêm grid vào.

    2. grid grid-rows/cols-1 xl:grid-rows/cols-{value} => grid xl:grid-rows/cols-{value}

       Không cần phải thêm grid-rows/cols-1 vào vì đấy là mặc định.
       Tương tự các element con mà chỉ chiếm 1 rows/cols khỏi cần thêm vì tailwind tự hiểu là nó chiếm 1 rows/cols

    3. grid grid-cols-1 => grid

        Không cần grid-cols-1 vì nếu chỉ một element thì tailwind tự hiểu 1 cột chiếm 1 hàng

    4.  divide-{rotation}-{value}

        Tạo border giữa 2 element trong grid. Rotation: x, y,...
        Vd: divide-x-2 : tạo ra vách ngăn 2 ~ {value}px giữa 2 element trong grid theo chiều ngang

    5. border rounded-s

        Tạo border và border-radius dựa trên attribute của element xài class rounded-s : dir: "ltr" | "rtl" | "auto"
        Nếu ltf thì border-radius ( top left , bottom left ), rtl ( top right , bottom right ), auto tự căn

    6. text-ellipsis

        Khiến đoạn text dài hơn element chứa nó hiển thị dưới dạng " ... "


/* ---------------------------------------------------------------------------------------------------*/

export default function Footer() {

    return (
        <footer className={`container px-4 md:px-6 xl:px-8 py-5 grid-rows-2 bg-white`}>
            {/*row 1*/}
            <div className={`grid md:grid-cols-12`}>

                <div className={`xl:col-span-4 flex flex-col xl:items-start`}>

                    {/*<Image*/}
                    {/*    src={"/assets/icons/neko.png"}*/}
                    {/*    alt={`Logo`}*/}
                    {/*    width={120}*/}
                    {/*    height={120}*/}
                    {/*    className={`hidden xl:block`}*/}
                    {/*/>*/}

                    <p className={`xl:text-3xl font-bold`}>GALLERY</p>

                    <p className={`leading-8 mt-1`}>
                        <span
                            className={`italic`}>{`" Một thứ gì đó được gọi là đẹp không chỉ qua cách nhìn mà còn qua cách ta cảm nhận nó. " `}
                        </span>
                        - TĐạt.
                    </p>

                </div>

                <div className={`grid xl:col-span-8 xl:grid-cols-3 xl:px-16`}>
                    {navigations.map((nav, index) => (
                        <div key={index}>

                            <div
                                className={`w-full md:hidden my-4 border-t-2 border-dashed border-neutral-200`}></div>

                            <p className={`font-bold`}>{nav.title}</p>

                            <ul className={`mt-4 flex flex-col space-y-3`}>
                                {nav.links.map((subNav, index) => (
                                    <Link key={index} href={subNav.path} target="_blank"
                                          className={`hover:text-indigo-900 hover:scale-105 transform transition-transform duration-300`}>
                                        <li>{subNav.subtitle}</li>
                                    </Link>
                                ))}

                            </ul>

                        </div>
                    ))}
                </div>

                {/*<div className={`xl:col-span-3 xl:mt-2`}>*/}

                {/*    <div className={`w-full md:hidden my-4 border-t-2 border-dashed border-neutral-200`}></div>*/}

                {/*    <p className={`font-medium`}>ĐĂNG KÝ</p>*/}

                {/*    <form onSubmit={submit}>*/}

                {/*        <div*/}
                {/*            className={`w-full xl:w-[80%] mt-2 border rounded flex items-center ${errors.email ? "ring-inset border-red-600" : ``} transition duration-200`}>*/}

                {/*            <input*/}
                {/*                dir="ltr"*/}
                {/*                type="text"*/}
                {/*                placeholder="example@gmail.com"*/}
                {/*                {...register("email")}*/}
                {/*                onChange={() => clearErrors("email")}*/}
                {/*                className={`w-[86%] text-gray-500 text-ellipsis px-3 py-1.5 focus:outline-none`}*/}
                {/*            />*/}

                {/*            <button*/}
                {/*                dir="rtl"*/}
                {/*                type="submit"*/}
                {/*                className={`group w-[14%] p-2 flex items-center justify-center hover:cursor-pointer`}*/}
                {/*            >*/}
                {/*                <Send color={`#3b82f6`} size={20} strokeWidth={1.5}/>*/}
                {/*            </button>*/}

                {/*        </div>*/}

                {/*        <p className={`${errors.email ? "block" : "opacity-100"} mt-1 text-sm text-red-600`}>*/}
                {/*            {errors.email?.message}*/}
                {/*        </p>*/}

                {/*    </form>*/}


                {/*    /!*  rel={"noopener noreferrer"}*!/*/}

                {/*    /!*rel="noopener"*!/*/}
                {/*    /!*Ngăn chặn trang web mới có quyền truy cập vào đối tượng window.opener của trang web gốc.*!/*/}
                {/*    /!*Điều này giúp bảo vệ trang của bạn khỏi các lỗ hổng bảo mật.*!/*/}

                {/*    /!*rel="noreferrer"*!/*/}
                {/*    /!*Ngăn không cho trình duyệt gửi thông tin về trang web của bạn (referrer information) đến trang web mới.*!/*/}

                {/*    /!*<div className={`mt-4`}>*!/*/}
                {/*    /!*    <p>Theo dõi chúng tôi qua các mạng xã hội</p>*!/*/}
                {/*    /!*    <ul className={`mt-2 flex items-center gap-5`}>*!/*/}
                {/*    /!*        {socials.map(i => (*!/*/}

                {/*    /!*            <Link key={i.provider} href={i.redirect} target={"_blank"}>*!/*/}
                {/*    /!*                <Image*!/*/}
                {/*    /!*                    src={i.secure_url !== "" ? i.secure_url : `/assets/icons/${i.iconName}`}*!/*/}
                {/*    /!*                    alt={`${i.provider} logo`}*!/*/}
                {/*    /!*                    width={36}*!/*/}
                {/*    /!*                    height={36}/>*!/*/}
                {/*    /!*            </Link>*!/*/}
                {/*    /!*        ))}*!/*/}
                {/*    /!*    </ul>*!/*/}
                {/*    /!*</div>*!/*/}

                {/*</div>*/}

            </div>

            {/*row 2*/}
            <div className={`grid mt-6 md:mt-16`}>
                <div className={`tracking-widest flex flex-col`}>

                    <div className={`flex justify-center items-center gap-2`}>
                        <div className={`p-[0.5px] border-[2px] border-zinc-600 rounded-full`}>
                            <Image
                                src="/assets/icons/copyright.png"
                                alt="Copyright icon"
                                width={10}
                                height={10}
                            />
                        </div>
                        <p>{startYear === currentYear ? currentYear : `${startYear} - ${currentYear}`}</p>
                    </div>

                    <p className={`text-center`}>Tất cả các quyền được bảo lưu</p>

                </div>
            </div>

        </footer>
    )
}