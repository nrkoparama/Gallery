"use client";
import {useEffect, useState} from "react";
import PCHeader from "@/app/components/ui/Header/PCHeader";
import MobileHeader from "@/app/components/ui/Header/MobileHeader";
import {useAuthor} from "@/app/components/provider/authorContext.provider";
import {usePathname} from "next/navigation";

// const notHideOnPaths = ["/"];
// const hide = notHideOnPaths.some(prefix => path.startsWith(prefix))
// if (!hide) return null;

// cách viết như này sẽ cần khai báo nhiều path hơn cách trên, có thể dynamic route như /path/{value}
const showOnPaths = ["/", "/blog", "/post"];


export default function Header() {
    const path = usePathname();
    const display = showOnPaths.some((p) => p === path || path.startsWith(`${p}/`));

    const [viewport, setViewport] = useState(0);
    const {author, getAuthorAction} = useAuthor();

    useEffect(() => {
        if (!author) {
            getAuthorAction();
        }
    }, [author, getAuthorAction]);

    useEffect(() => {
        function updateSize() {
            setViewport(window.innerWidth);
        }

        window.addEventListener("resize", updateSize);
        updateSize();
        return () => removeEventListener("resize", updateSize);
    }, [viewport])

    if (!display) return null;

    return (
        <header className={`sticky top-0 left-0 z-10 w-full xl:px-8`}>
            {viewport > 640 ? <PCHeader author={author}/> : <MobileHeader author={author}/>}
        </header>

    )
}