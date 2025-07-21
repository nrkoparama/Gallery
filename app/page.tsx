"use client";
import {useState} from "react";
import MobileNav from "@/app/components/ui/mobile-nav";
import {toast} from "sonner"
import {Button} from "@/components/ui/button"
import {TriangleAlert } from "lucide-react";
import {signOut} from "next-auth/react";
import {useSelector} from "react-redux";
import type {ReduxStates} from "@/types/Redux"

export default function Home() {
    const id = useSelector((state: ReduxStates) => state.account.accountInformation.id);
    console.log({id})
    const [navMobile, setNavMobile] = useState(false);
    const handleClick = () => {
        toast.error("Gửi mail thất bại", {
            icon: <TriangleAlert  className={`text-red-500`}/>,
            description: "Vui lòng kiểm tra email",
        })
    }
    return (
        <div>
            <button onClick={() => setNavMobile(true)}>Mount</button>
            {navMobile && (<MobileNav setActive={setNavMobile}/>)}
            <Button
                variant="outline"
                onClick={() => handleClick()}
            >
                Show Toast
            </Button>
            <button onClick={()=>signOut()}>Thoát</button>
        </div>
    );
}
