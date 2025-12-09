"use client";
import {ReactNode} from "react";

export default function Modal({children}: { children: ReactNode }) {
    return (
        <>
            {/*/!*lưu ý không bọc component bằng các component cha có realative / absolute  *!/*/}
            {/*<div className={`${modalState ? "block" : "hidden"} fixed inset-0 z-50 p-6`}>*/}
            {/*    /!* Overlay *!/*/}
            {/*    <div onClick={() => setModalState(false)} className={`absolute inset-0 bg-black/40`}></div>*/}
            {/*    /!* Modal *!/*/}
            {/*    <div className={`relative z-50`}>*/}
            {/*        {children}*/}
            {/*    </div>*/}
            {/*</div>*/}
            {children}
        </>
    )
}