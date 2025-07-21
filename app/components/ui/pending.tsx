"use client";
import Lottie from "lottie-react";
import pendingAnimation from "@/components/animations/lottie-ui/pendingAnimation.json"

export default function PendingAnimation() {
    return <Lottie animationData={pendingAnimation} loop={true} autoplay={true} className={`w-8 h-8`}/>
}