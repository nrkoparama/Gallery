"use client";
import {ReactNode, useEffect, useRef, useState} from "react";
import {Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {usePathname, useRouter} from "next/navigation";
import {LogOut, Settings} from "lucide-react";
import {useAuthor} from "@/app/components/provider/authorContext.provider";
import {activeToast} from "@/utils/activeToast";
import {signOut} from "next-auth/react";
import {sleep} from "@/utils/delay";

const navLinks = [
    {label: "Trang chủ", path: "/"},
    {label: "Giới thiệu", path: "/about"},
    {label: "Thư viện ảnh", path: "/gallery"},
    {label: "Bài viết", path: "/blog"},
    {label: "Liên hệ", path: "/contact"}
]

export default function HiddenMenu({children}: { children: ReactNode }) {
    const router = useRouter();
    const path = usePathname();
    const [currentPathName, setCurrentPathName] = useState(path);
    const sheetRef = useRef<HTMLButtonElement>(null);
    const {author, getAuthorAction} = useAuthor();

    const handleSignOut = async () => {
        signOut();

        activeToast("Đăng xuất thành công", {type: "success", duration: 2000});

        await sleep(5000);

        setTimeout(() => {
            sheetRef.current?.click();
        })
    }
    useEffect(() => {
        if (!author) {
            getAuthorAction()
        }
    }, [author, getAuthorAction]);

    useEffect(() => {
        setCurrentPathName(path);
    }, [path]);


    return (
        <Sheet>
            <SheetTitle className={`hidden`}></SheetTitle>
            <SheetDescription className={`hidden`}></SheetDescription>
            <SheetTrigger>
                {children}
            </SheetTrigger>
            <SheetContent side="left" className={`w-[70%]`}>
                <div className={`h-full text-xl py-14 flex flex-col justify-between`}>
                    <ul className={`flex flex-col items-center space-y-3`}>
                        {navLinks.map((i, index) => (
                            <button
                                key={index}
                                onClick={() => router.push(i.path)}
                                disabled={currentPathName === i.path}
                                title={currentPathName === i.path ? "Trang hiện tại" : i.label}
                                className={`w-[90%] text-left px-6 py-2 `}
                            >
                                <span>{i.label}</span>
                            </button>
                        ))}
                    </ul>

                    <div className={`flex flex-col items-center space-y-3`}>

                        {author && (
                            <div className={`w-[90%] px-6 py-2 flex items-center gap-5`}
                                 onClick={() => handleSignOut()}>

                                <LogOut strokeWidth={1.5}/>

                                <p>Đăng xuất</p>

                            </div>
                        )}


                        <div className={`w-[90%] px-6 py-2 flex items-center gap-5`}>

                            <Settings strokeWidth={1.5}/>

                            <p>Cài đặt</p>

                        </div>

                    </div>
                </div>
                <SheetClose ref={sheetRef} className={`hidden`}>Đóng</SheetClose>
            </SheetContent>
        </Sheet>
    )
}


{/*<div className={`w-[90%] px-6 py-2 flex items-center gap-3`}>*/
}
{/*    <div className={`relative w-10 h-10 aspect-square border-[2px] border-neutral-200 rounded-full overflow-hidden`}>*/
}
{/*        <Avatar path={`/assets/icons/avt.webp`} description={`Avatar`} size={`36px`}/>*/
}
{/*    </div>*/
}
{/*    <div className={`flex flex-col`}>*/
}
{/*        <p className={`text-lg`}>Nguyễn Thị Kiều Trang</p>*/
}
{/*        <p className={`text-sm opacity-60`}>vta****************@gmail.com</p>*/
}
{/*    </div>*/
}
{/*</div>*/
}
