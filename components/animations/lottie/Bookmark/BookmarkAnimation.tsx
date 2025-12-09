import React from "react";
import Lottie from "lottie-react";
import bookmark from "./bookmarkAnimation.json";

export default function BookmarkAnimation(props: React.HTMLAttributes<HTMLDivElement>) {
    return <Lottie
        animationData={bookmark}
        loop={false}
        autoplay={true}
        {...props}
    />
}