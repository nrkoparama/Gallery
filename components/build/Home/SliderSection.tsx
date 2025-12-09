"use client";
import Image from "next/image";
import React from "react";

export default function SliderSection(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props}>
            <div className={`relative w-full h-[600px]`}>
                <Image
                    src="/assets/images/banners/hero-banner2.jpg"
                    alt="Hero banner"
                    fill
                    className={`object-cover`}
                />
            </div>
        </div>
    )
}