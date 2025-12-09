"use client";
import SliderSection from "@/components/build/Home/SliderSection";
import ExploreSection from "@/components/build/Home/ExploreSection";
import GallerySection from "@/components/build/Home/GallerySection";
import WhyChooseUsSection from "@/components/build/Home/WhyChooseUsSection";
import SubscriptionSection from "@/components/build/Home/SubscriptionSection";
import NewsSection from "@/components/build/Home/NewsSection";
import NewsLetterComponent from "@/components/build/Home/SubscribeNewsLetterSection";


const blogs = [
    {
        title: "Biển và Em",
        content: "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả",
        image: "/assets/images/banners/hero-banner1.jpg"
    },
    {
        title: "Biển và Em",
        content: "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả",
        image: "/assets/images/banners/hero-banner1.jpg"
    },
    {
        title: "Biển và Em",
        content: "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả",
        image: "/assets/images/banners/hero-banner1.jpg"
    }, {
        title: "Biển và Em",
        content: "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả.\n" +
            "Trước khi gặp em đối với anh Biển là nhà, nó mang lại cho anh một cảm giác khó tả",
        image: "/assets/images/banners/hero-banner1.jpg"
    }
]
const images = [
    "/assets/images/mockups/mockup-1.jpg",
    "/assets/images/mockups/mockup-2.webp",
    "/assets/images/mockups/mockup-3.jpg",
    "/assets/images/mockups/mockup-4.jpg",
    "/assets/images/mockups/mockup-5.jpg"
]

export default function HomeLayout() {
    return (
        <div className={`space-y-12`}>
            <SliderSection/>
            <ExploreSection/>
            <GallerySection images={images}/>
            <NewsSection titleSection="Bài viết nổi bật" blogs={blogs}/>
            <WhyChooseUsSection/>
            <SubscriptionSection/>
            <NewsSection titleSection="sự kiện và tin tức" blogs={blogs}/>
            <NewsLetterComponent/>
        </div>
    )
}