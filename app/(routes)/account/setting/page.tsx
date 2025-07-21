"use client";
import LoadingLayout from "@/app/components/layout/loadingLayout";
import {useRouter} from "next/navigation";
import {sleep} from "@/utils/delay";

export default function ConfigAccPage() {
    const router = useRouter();

    const delayRedirect = async () => {
        await sleep(1500);
        router.push("/account/setting/profile");
        return;
    };
    delayRedirect();

    return <LoadingLayout/>
}