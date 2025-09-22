"use client";
import Image from "next/image";

export default function Avatar({path, size, description}: {
    path: string,
    size: string,
    description: string,

}) {
    return (
            <Image
                src={path}
                alt={description}
                fill
                sizes={size}
                className={`object-cover`}
            />
    )
}