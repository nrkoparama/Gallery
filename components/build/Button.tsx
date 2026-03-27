import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    typeButton: "button" | "link",
    text: string,
    path?: string;
    title?: string,
    icon?: ReactNode,
    iconPosition?: "left" | "right",
    className?: string
}

export default function Button({
    typeButton = "button",
    text,
    path,
    title,
    icon,
    iconPosition = "left",
    className,
    ...props
}: ButtonProps) {

    const pathName = usePathname();
    return (
        typeButton === "link" ? (
            <button className={`${className}`}{...props}>
                <Link href={path ?? pathName} target="_blank" rel="noopener noreferrer">
                    {text}
                </Link>
            </button>
        ) : (
            <button
                {...props}
                title={title ?? text}
                className={`${className} px-4 py-2.5 border rounded-sm inline-flex ${iconPosition === "left" ? "" : "flex-row-reverse"} justify-center items-center gap-1.5`}>
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