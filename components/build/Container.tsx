import {HTMLAttributes, ReactNode} from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

/**
 * Tài liệu về class "container" trong Tailwindcss
 * https://v3.tailwindcss.com/docs/container
 * sm: max-width = 640px
 * md: max-width = 768px
 * lg: max-width = 1024px
 * xl: max-width= 1280px
 * 2xl max-width = 1536px
 * */
export default function Container({children, ...props}: ContainerProps) {
    return (
        <div {...props} className={`container px-4 md:px-6 xl:px-8 antialiased tracking-wider`}>
            {children}
        </div>
    )
}