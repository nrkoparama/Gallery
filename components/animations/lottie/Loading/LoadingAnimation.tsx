import React from "react";
import Lottie from "lottie-react";
import loading from "./loadingAnimation.json"

export default function LoadingAnimation(props: React.HTMLAttributes<HTMLDivElement>) {
    return <Lottie
        animationData={loading}
        loop={true}
        autoplay={true}
        {...props}
    />
}