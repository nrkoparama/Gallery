"use client";
import Image from "next/image"
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";

const slideImages = ["/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg"];


export default function HomeComponent() {
    return (
        <section className={``}>
            <section>
                <div className={`relative w-full h-[600px]`}>
                    <Image
                        src="/assets/images/banners/hero-banner.jpg"
                        alt="Hero banner"
                        fill
                        className={`object-cover`}
                    />
                </div>

                <div className={`grid grid-cols-2 p-8`}>
                    <h2 className={`text-3xl text-center`}>Lưu giữ những kỉ niệm qua những tấm ảnh</h2>
                    <div className={`flex flex-col gap-3`}>
                        <p>
                            Mỗi một tấm ảnh đều mang một câu chuyện, một cảm xúc riêng đối với mỗi con
                            người chúng ta. Và chúng tôi rất vui khi được chia sẻ, cảm nhận giống bạn.
                        </p>
                        <div className={`flex gap-3`}>
                            <button
                                className={`w-28 p-2 rounded bg-[#008080] text-white shadow hover:cursor-pointer`}>Khám
                                phá
                            </button>
                            <button className={`w-28 p-2 rounded bg-white text-black shadow hover:cursor-pointer`}>Bắt
                                đầu
                            </button>
                        </div>
                    </div>
                </div>

            </section>
            <section className={`my-6 px-8 flex flex-col items-center space-y-`}>
                <div className={`flex flex-col items-center gap-3`}>
                    <h2 className={`text-2xl font-bold`}>Thư viện ảnh</h2>
                    <p>{`Cùng khám phá những khoảng khắc tuyệt vời từ cộng đồng của chúng tôi`}</p>
                </div>


                <Carousel opts={{align: "start"}} orientation={`vertical`} className={`w-[80%] mx-auto`}>
                    <CarouselContent className={`-mt-1.5 h-[400px]`}>
                        {slideImages.map((url, index) => (
                            <CarouselItem key={index} className={`pt-1 md:basis-1/2`}>
                                <div className={`relative w-full h-[400px]`}>
                                    <Image src={url} alt={`Slide ${index + 1} image`} fill className={`object-cover`}/>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </section>

        </section>
    )
}