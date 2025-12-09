"use client";
import LoadingAnimation from "@/components/animations/lottie/Loading/LoadingAnimation";

export default function LoadingAnimationWrapper() {
    return <div className={`fixed inset-0 z-99 flex`}>
        <div className={`w-full h-full bg-stone-50/70`}></div>
        <div className={`relative w-full h-full flex justify-center items-center`}>
            <LoadingAnimation className={`absolute w-24 h-24`}/>
        </div>
    </div>
}