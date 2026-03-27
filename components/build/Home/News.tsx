"use client";
import Image from "next/image";

export default function News() {
    return (
        <section className={`container px-4 md:px-6 xl:px-8`}>
            <div className={`w-[90%] mx-auto space-y-5`}>
                <h2 className={`text-xl text-center uppercase font-semibold`}>tại sao là gallery</h2>
                <div className={`w-full text-white flex gap-x-3`}>
                    <div className={`w-[70%]`}>
                        <div className={`grid grid-cols-2 gap-3`}>
                            <div
                                className={`relative col-span-2 aspect-auto h-80 bg-neutral-200 rounded-md overflow-hidden`}>
                                <Image
                                    src={"/assets/demo/4.webp"}
                                    alt={"Ảnh 1"}
                                    fill
                                    className={`object-cover opacity-60`}
                                />

                                <div className={`absolute inset-0 z-10 px-8 py-10 space-y-3`}>
                                    <p className={`text-2xl font-semibold uppercase`}>tải ảnh chất lượng cao</p>

                                    <p className={`text-sm`}>
                                        Có thể tải và sử dụng miễn phí ảnh do các nhiếp ảnh gia trên khắp thế giới đóng
                                        góp.
                                    </p>

                                    <button className={`px-4 py-2.5 bg-teal-500 rounded`}>
                                        Tải ảnh lên
                                    </button>
                                </div>

                            </div>
                            <div
                                className={`relative col-span-1 aspect-auto h-40 bg-neutral-200 rounded-md overflow-hidden`}>
                                <Image
                                    src={"/assets/demo/4.webp"}
                                    alt={"Ảnh 1"}
                                    fill
                                    className={`object-cover opacity-60`}
                                />

                                <div className={`absolute inset-0 z-10 px-8 py-10 space-y-3`}>
                                    <p className={`text-2xl font-semibold uppercase`}>Đăng tải ảnh</p>
                                </div>
                            </div>
                            <div
                                className={`relative col-span-1 aspect-auto h-40 bg-neutral-200 rounded-md overflow-hidden`}>
                                <Image
                                    src={"/assets/demo/4.webp"}
                                    alt={"Ảnh 1"}
                                    fill
                                    className={`object-cover opacity-60`}
                                />

                                <div className={`absolute inset-0 z-10 px-8 py-10 space-y-3`}>
                                    <p className={`text-2xl font-semibold uppercase`}>Đăng tải bài viết</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`w-[30%]`}>
                        <div className={`w-full h-full grid grid-rows-3 gap-3`}>
                            <div className={`relative bg-neutral-200 rounded-md overflow-hidden`}>
                                <Image
                                    src={"/assets/demo/4.webp"}
                                    alt={"Ảnh 1"}
                                    fill
                                    className={`object-cover opacity-60`}
                                />

                                <div className={`absolute inset-0 z-10 px-8 py-10 space-y-3`}>
                                    <p className={`text-2xl font-semibold`}>Lưu trữ linh hoạt</p>
                                </div>
                            </div>
                            <div className={`relative bg-neutral-200 rounded-md overflow-hidden`}>
                                <Image
                                    src={"/assets/demo/4.webp"}
                                    alt={"Ảnh 1"}
                                    fill
                                    className={`object-cover opacity-60`}
                                />

                                <div className={`absolute inset-0 z-10 px-8 py-10 space-y-3`}>
                                    <p className={`text-2xl font-semibold`}>Nguồn cảm hứng</p>
                                </div>
                            </div>
                            <div className={`relative bg-neutral-200 rounded-md overflow-hidden`}>
                                <Image
                                    src={"/assets/demo/4.webp"}
                                    alt={"Ảnh 1"}
                                    fill
                                    className={`object-cover opacity-60`}
                                />

                                <div className={`absolute inset-0 z-10 px-8 py-10 inline-flex justify-center items-center`}>
                                    <p className={`text-2xl font-semibold`}>Bảo mật thông tin</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}