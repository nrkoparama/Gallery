import React from "react";
import Lottie from "lottie-react";
import heart from "./heartAnimation.json";

export default function HeartAnimation(props: React.HTMLAttributes<HTMLDivElement>) {
    return <Lottie
        animationData={heart}
        loop={false}
        autoplay={true}
        {...props}
    />
}
