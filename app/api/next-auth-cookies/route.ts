import {NextRequest, NextResponse} from "next/server";
import {getToken} from "next-auth/jwt";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

export async function GET(request: NextRequest) {
    try {
        // nếu tìm hiểu sâu hover vào getToken check tham số
        const token = await getToken({req: request, secret: NEXTAUTH_SECRET, cookieName: "next-auth.token"});

        if (!token) return NextResponse.json({
            status_code: 401,
            message: "Lấy token thất bại",
            error: "Unauthorized - Get token failed"
        });

        // console.log(token);
        const accessToken = token.accessToken;
        const refreshToken = token.refreshToken;

        if (!accessToken && !refreshToken) return NextResponse.json({
            status_code: 401,
            message: "Lấy token thất bại",
            error: "Unauthorized - Get tokens failed"
        })

        return NextResponse.json({status_code: 200, message: "Lấy token thành công", accessToken, refreshToken});

    } catch (error) {
        // console.log("Lỗi lấy cookies: ", error);
        return NextResponse.json({status_code: 500, message: "Lỗi lấy token", error})
    }
}
