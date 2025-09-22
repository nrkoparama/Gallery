import type { User } from "next-auth"
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials"
import { Login, ThirdPartyLogin } from "@/app/services/api/account";


export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET!,
    cookies: {
        sessionToken: {
            // name: "__Secure-next-auth.session-token", // tiền tố "__Secure-" chỉ có thể sử dụng khi trang web là https
            name: "next-auth.token",
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: false
            }
        }
    },
    // mặc định là jwt, nếu dùng adapter thì đổi thành database
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
        // updateAge: 24 * 60 * 60
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {

                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await Login({ email: credentials.email, password: credentials.password });

                    if (response.status_code !== 200) {
                        return null;
                    }
                    // console.log("Check response: ", response);

                    return response.data;
                } catch (error) {
                    console.log("Lỗi đăng nhập credentials: ", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {

        async signIn({ account }) {

            const provider = account?.provider;

            // !! sẽ chuyển provider thành boolen , nếu có giá trị sẽ là true , ngược lại false
            return !!provider; // nếu return false do tài khoản bị khóa hoặc từ chối đăng nhập thì signIn bên Btn sẽ nhận được error
        },

        async jwt({ token, user, account }) {

            if (!account || !account.provider) {
                return token;
            }

            if (account.provider === "credentials") {
                if (user) {
                    const { authorId: id, fullName, email, provider, image, role, accessToken, refreshToken } = user;
                    token.user = { id, fullName, email, image, provider, role };
                    token.accessToken = accessToken;
                    token.refreshToken = refreshToken;
                }
                return token;
            }

            if (user) {
                try {
                    const response = await ThirdPartyLogin(account.provider, user);

                    if (response.status_code !== 200 && response.status_code !== 201) return token;

                    // không cần custom type do đây là Token, không liên quan đến User hay Session, chỉ cần ở dưới vì session.user === User
                    const { authorId: id, fullName, email, provider, image, role, accessToken, refreshToken } = response.data;
                    
                    token.user = { id, fullName, email, image, role, provider };
                    
                    token.accessToken = accessToken;
                    
                    token.refreshToken = refreshToken;
                    
                    return token;
                } catch (error) {
                    console.log("Lỗi đăng nhập third party: ", error);
                    return token;
                }
            }
            return token
        },

        async session({ session, token }) {
            if (token) {
                session.user = token.user as User;
                session.accessToken = token.accessToken as string;
                session.refreshToken = token.refreshToken as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    debug: true,  // log lỗi ra console

}
