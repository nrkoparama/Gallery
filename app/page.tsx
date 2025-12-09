"use client";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";
import {activeToast} from "@/utils/activeToast";
import HomeLayout from "@/components/build/Home/HomeLayout";

export default function Home() {
    const params = useSearchParams();
    const router = useRouter();
    // const session = useSession();

    useEffect(() => {
        const isLogin = params.get("login");
        // const isGreet = localStorage.getItem("greet");
        // const isNew = localStorage.getItem("isNew");

        if (!isLogin) {
            activeToast("Đăng nhập thành công", {
                type: "success",
                description: "Chào mừng quay trở lại",
                duration: 4000
            });
            const timerId = setTimeout(() => router.replace("/"), 1000);
            return () => clearTimeout(timerId);
        }


    }, [params, router]);

    return <HomeLayout/>

}
