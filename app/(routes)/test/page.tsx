// import LoadingLayout from "@/app/components/layout/loadingLayout";
// import PendingAnimation from "@/app/components/ui/pending";
"use client"
import {GetUserInfo} from "@/app/services/api/account";
import {useEffect, useState} from "react";

export default function Page() {
    const [user, setUser] = useState(null);
    console.log(c)
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await GetUserInfo("685d0741060bc861e378e04e");
                if (res.status === 200) {
                    setUser(res.data);
                    return
                } else {
                    console.log(res);
                }
            } catch (error) {
                console.log({error});
            }
        }
        getData();
    }, []);
    // console.log(">>> Current user: ", user)
    return <div>
        {user?.fullName || "Dat"}
    </div>
}