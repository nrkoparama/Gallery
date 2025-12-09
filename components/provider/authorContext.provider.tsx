"use client"
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {GetUserInfo} from "@/services/api/account";

import type {Author} from "@/types/Author";

type AuthorContextType = {
    author: Author | null,
    setAuthorAction: (author: Author | null) => void,
    getAuthorAction: () => Promise<void>
}

const AuthorContext = createContext<AuthorContextType>({
    author: null,
    setAuthorAction: () => {},
    getAuthorAction: async () => {},
});

export default function AuthorProvider({children}: { children: ReactNode }) {
    const [author, setAuthorAction] = useState<Author | null>(null);

    const getAuthorAction = useCallback(async () => {
        const response = await GetUserInfo();
        if (response.status_code === 200) {
            setAuthorAction(response.data);
            return;
        }
        console.log(response); // debug -> product nên clear dòng này
        return;
    }, []);


    useEffect(() => {
        getAuthorAction();
    }, [getAuthorAction]);

    return <AuthorContext.Provider value={{author, setAuthorAction, getAuthorAction}}>
        {children}
    </AuthorContext.Provider>
}

export const useAuthor = () => useContext(AuthorContext);