import {AuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const url = process.env.DEV_SERVER_URL!;

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        })
    ],
    callbacks: {

        async signIn({account}) {
            console.log(account?.provider);
            return true;
        },

        async jwt({token, user, account}) {
            if (user) {
                try {
                    let loginType = "";
                    let firstName = "";
                    let lastName = "";
                    const {email, image} = user;

                    if (account?.provider) {
                        loginType = account.provider;
                    }

                    switch (loginType) {
                        case "google": {
                            if (user?.name) {
                                /* lastIndexOf(value): ví dụ lastIndexOf(" ") lấy ra vị trí dấu _ cuối cùng : number
                                */
                                const lastSpaceIndex = user.name.lastIndexOf(" ");

                                if (lastSpaceIndex === -1) {
                                    firstName = "";
                                    lastName = user.name;
                                } else {
                                    firstName = user.name.slice(0, lastSpaceIndex);
                                    lastName = user.name.slice(lastSpaceIndex + 1); // bỏ khoảng trống cuối và lấy toàn bộ về sau
                                }
                            }
                            break;
                        }
                        case "facebook": {
                            break;
                        }
                        default: {
                            break;
                        }
                    }


                    const res = await fetch(`${url}/authors/author/login/third-party`, {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({firstName, lastName, email, image, loginType, isThirdParty: true})
                    })

                    const data = await res.json();

                    if (data.status !== 200) {
                        console.log("Lỗi đăng nhập third party ()");
                        return token;
                    }
                    token.accessToken = data.accessToken;
                    token.refreshToken = data.refreshToken;
                } catch (error) {
                    console.log("Lỗi đăng nhập third party: ", error)
                }
            }
            return token
        },

        async session({session, token}) {
            return {
                ...session,
                accessToken: token.accessToken,
                refreshToken: token.refreshToken
            }
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    // debug: true,  log lỗi ra console

}
