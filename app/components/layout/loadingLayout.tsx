"use client";
import Loading from "@/app/components/ui/loading";

export default function LoadingLayout() {
    return <div className={`fixed inset-0 z-10 flex`}>
        <div className={`w-full h-full bg-stone-50 opacity-70`}>
        </div>
        <div className={`absolute w-full h-full flex justify-center items-center`}>
            <Loading/>
        </div>
    </div>
}