interface ReduxStates {
    account: {
        accountInformation: {
            id: string,
            email: string,
            login: boolean,
            role: number
        },
        bookmarks: [{ id: string }],
        favorites: [{ id: string }],
    },
}


export type {ReduxStates};