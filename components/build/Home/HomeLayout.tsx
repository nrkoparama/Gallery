"use client";
import SliderSection from "@/components/build/Home/SliderSection";
import ExploreSection from "@/components/build/Home/ExploreSection";
import WhyChooseUsSection from "@/components/build/Home/WhyChooseUsSection";
import SubscriptionSection from "@/components/build/Home/SubscriptionSection";
import NewsSection from "@/components/build/Home/NewsSection";
import NewsLetterComponent from "@/components/build/Home/SubscribeNewsLetterSection";

const blogs = [
    {
        title: "Tiêu đề bài viết",
        content: "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết",
        image: "/assets/banners/hero-banner1.jpg"
    },
    {
        title: "Tiêu đề bài viết",
        content: "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết",
        image: "/assets/banners/hero-banner1.jpg"
    },
    {
        title: "Tiêu đề bài viết",
        content: "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết",
        image: "/assets/banners/hero-banner1.jpg"
    }, {
        title: "Tiêu đề bài viết",
        content: "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết.\n" +
            "Đây là mô tả bài viết",
        image: "/assets/banners/hero-banner1.jpg"
    }
]
const images = [
    "/assets/demo/1.webp",
    "/assets/demo/2.jpg",
    "/assets/demo/3.jpg",
    "/assets/demo/4.webp",
    "/assets/demo/5.webp"
]

export default function HomeLayout() {
    return (
        <div className={`space-y-10`}>
            <SliderSection/>
            <ExploreSection images={images}/>
            <NewsSection titleSection="sự kiện và tin tức" blogs={blogs}/>
            <WhyChooseUsSection/>
            <SubscriptionSection/>
            <NewsSection titleSection="sự kiện và tin tức" blogs={blogs}/>
            <NewsLetterComponent/>
        </div>
    )
}