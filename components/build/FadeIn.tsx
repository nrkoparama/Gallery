"use client";
import {ReactNode, useEffect, useRef, useState} from "react";

interface FadeInWrapperProps {
    children: ReactNode,
    threshold?: number,
    rootMargin?: string,
}

export default function FadeInWrapper({
                                          children,
                                          threshold = 0.2,
                                          rootMargin = "0px"
                                      }: FadeInWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const currentRef = ref.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (currentRef) observer.unobserve(entry.target);
                }
            },
            {
                // threshold: sẽ trigger khi visible 10%
                // rootMargin: quản lý việc trigger nếu 0 thì sẽ không trigger sớm,
                // nếu 50px thì cách element 50px sẽ trigger
                threshold,
                rootMargin
            }
        )

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        }
    }, [threshold, rootMargin])

    return (
        <div ref={ref} data-visible={isVisible}>
            {children}
        </div>
    )
}