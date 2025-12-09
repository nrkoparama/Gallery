import {CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,Carousel} from "@/components/ui/carousel";
import Image from "next/image";

const slideImages = ["/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg", "/assets/images/banners/hero-banner.jpg"];


export default function CustomCarousel() {
    return <Carousel opts={{align: "start"}} orientation={`vertical`} className={`w-[80%] mx-auto`}>
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
}