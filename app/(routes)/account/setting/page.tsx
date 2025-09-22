"use client";
import LoadingLayout from "@/app/components/layout/loadingLayout";
import {useRouter} from "next/navigation";


export default function ConfigAccPage() {
    const router = useRouter();

    // window.location chỉ hoạt động trên client
    if (typeof window !== "undefined") {
        setTimeout(() => {
            router.push("/account/setting/profile");
        }, 1000);
    }
    return <LoadingLayout/>
}