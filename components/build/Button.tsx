"use client";
import {usePathname, useRouter} from "next/navigation";
import {ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    typeButton: "button" | "link",
    text: string,
    link?: string;
    title?: string,
    variant?: "basic" | "success" | "warning" | "error" | "information" | "unActive",
    icon?: ReactNode,
}

const buttonVariant = {
    basic: "bg-gray-200 cursor-pointer",
    success: "bg-teal-500 text-white cursor-pointer",
    warning: "bg-yellow-500 text-white cursor-pointer",
    error: "bg-red-500 text-white cursor-pointer",
    information: "bg-blue-500 text-white cursor-pointer",
    unActive: "bg-gray-200 opacity-50 cursor-not-allowed"
}

export default function Button({
                                   typeButton = "button",
                                   text,
                                   link,
                                   title,
                                   variant = "basic",
                                   icon,
                                   className,
                                   ...props
                               }: ButtonProps) {
    const router = useRouter();
    const pathName = usePathname();
    return (
        typeButton === "button" ? (
            <button
                {...props}
                title={title ?? text}
                className={`${className ? `${className}` : `${variant ? buttonVariant[variant] : buttonVariant["basic"]} px-4 py-2.5 border rounded-sm`} flex justify-center items-center gap-1.5`}>

                {icon && (
                    <span>
                    {icon}
                </span>
                )}

                {text}

            </button>
        ) : (
            <button
                className={`${className ? `${className}` : `${variant ? buttonVariant[variant] : buttonVariant["basic"]} px-4 py-2.5 border rounded-sm`} flex justify-center items-center gap-1.5`}
                onClick={() => router.push(link ?? pathName)}
                {...props}>

                {icon && (
                    <span>
                    {icon}
                </span>
                )}

                {text}

            </button>
        )


    )
}