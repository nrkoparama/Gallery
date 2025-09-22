import {DefaultSession, DefaultUser} from "next-auth";

declare module "next-auth" {

    interface User extends DefaultUser {
        // default types
        // id:string,
        // name?:string,
        // email?:string,
        // image?:string,

        // custom types
        authorId?:string,
        fullName?: string,
        accessToken?: string,
        refreshToken?: string,
        role?: string,
        provider?: string,
    }

    interface Session extends DefaultSession {
        user?: User,
        // expires?: ISODateString,
        provider?: string | undefined,
        accessToken?: string,
        refreshToken?: string
    }

}


// interface User {
//     id: string,
//     name?: string,
//     email?: string,
//     image?: string,
//     role?: 0,
// }

// custom lại type của Session ( Session extend từ DefaultSession )
// interface Session {
//     user?: DefaultSession["user"], // ~ user?:{name?:string|null, email?:string|null, image?:string|null }
//     expires?: ISODateString;
//     // provider?: string // phần mở rộng
//     accessToken?: string,
//     refreshToken?: string
// }


