"use client"
import {ReactNode} from "react";
import {Provider} from "react-redux";
import store from "@/redux/store";

// import type {ReduxStates} from "@/types/Redux"
// import {ReLogin} from "@/app/services/api/account";

export default function ReduxProvider({children}: { children: ReactNode }) {
    // const isLogin = useSelector((state: ReduxStates) => state.account.accountInformation.login);
    // useEffect(() => {
    //     if (!isLogin) {
    //         const login = async () => {
    //             await ReLogin();
    //         }
    //         login();
    //     }
    // }, [isLogin]);
    return <Provider store={store}>{children}</Provider>
};
