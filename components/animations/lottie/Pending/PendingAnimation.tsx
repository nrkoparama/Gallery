import React from "react";
import Lottie from "lottie-react";
import pending from "./pendingAnimation.json";

export default function PendingAnimation(props: React.HTMLAttributes<HTMLDivElement>) {
    return <Lottie
        animationData={pending}
        loop={true}
        autoplay={true}
        {...props}
    />
}