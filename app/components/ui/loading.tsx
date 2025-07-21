"use client";
import Lottie from "lottie-react";
import loadingAnimation from "@/components/animations/lottie-ui/loadingAnimation.json"

export default function LoadingAnimation() {
    return <Lottie animationData={loadingAnimation} loop={true} autoplay={true} className={`w-72 h-72`}/>
}