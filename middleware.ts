import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

export default async function middleware(req: NextRequest) {

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: "next-auth.token"
    });

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const {accessToken, refreshToken} = token;

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // call api xác thực
    const refreshTokenResponse = await fetch("https://localhost:4000/api/v1/authors/author/refresh-token", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Refresh-Token": refreshToken as string,
        },
    })

    const response = await refreshTokenResponse.json();

    if (response.status_code === 200) {
        if (response.data.accessToken) {
            token.accessToken = response.data.accessToken;

            const res = NextResponse.next();
            res.cookies.set("next-auth.token", JSON.stringify(token), {
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production" ? true : false,
                path: "/"
            });
            return res;
        }
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
    matcher: ['/account/setting', '/account/setting/:path*']
}