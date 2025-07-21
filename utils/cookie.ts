import {NextRequest} from "next/server";

/* Client Side  */
export const setCookieCSR = (name: string, value: string, days: number) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // *1000: set thời gian về milliseconds
    document.cookie = `${name}=${value}; Path=/; ${days && days > 0 ? `Expires=${date.toUTCString()}` : ``}`;
};

export const getCookieCSR = (name: string) => {
    if (typeof window === "undefined" || typeof document === "undefined") return null;
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) return value;
    }
    return null;
};

/* Server Side */

export const getCookieSSR = (req: NextRequest, name: string) => {
    // Kiểm tra req và headers
    if (!req || !req.headers) {
        console.log('Invalid request or headers');
        return null;
    }

    // Lấy header cookie
    const cookieHeader = req.headers.get("cookie");

    if (!cookieHeader) {
        console.log('No cookie header found');
        return null;
    }

    // Sử dụng regex để tách cookie an toàn hơn
    const cookies = cookieHeader.split(/;\s*/);

    for (const cookie of cookies) {
        // Bỏ qua nếu cookie không hợp lệ
        if (!cookie) continue;

        // Tách key và value an toàn
        const [rawKey, rawValue] = cookie.split('=');

        // Trim và kiểm tra
        const key = rawKey?.trim();
        const value = rawValue?.trim();

        if (!key || !value) continue;

        if (key === name) {
            try {
                return decodeURIComponent(value);
            } catch (error) {
                console.error('Decoding error:', error);
                return value;
            }
        }
    }

    return null;
};

/* Delete Cookie */

export const deleteCookie = (name: string) => {
    document.cookie = `${name}=; Expires=Mon, 01 Jan 1970 00:00:00 UTC;`; //set thời gian về quá khứ làm cookie hết hạn
};

export const deleteCookies = () => {
    document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
            .replace(/^ +/, "")
            .replace(/=.*/, "=; Expires=Sun, 01 Jan 1970 00:00:00 UTC");
    });
};
