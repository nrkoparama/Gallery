const accountUrl = `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/authors`;
// const prodUrl = "";

import type {LoginForm, RegisterForm} from "@/types/Form";
import {User} from "next-auth";
// import {getCookieSSR} from "@/utils/cookie";
// import {NextRequest} from "next/server";

/*------------------------Client Apis------------------------------------*/

async function Register(form: RegisterForm) {
    try {
        const response = await fetch(`${accountUrl}/register`, {
            method: "POST",
            // credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error};
    }
}

async function Login(form: LoginForm) {
    try {
        const response = await fetch(`${accountUrl}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
        });

        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error};
    }
}

async function ThirdPartyLogin(provider: string, user: User) {
    try {
        let firstName = "";
        let lastName = "";

        switch (provider) {
            case "google": {
                if (user?.name) {
                    /* lastIndexOf(value): ví dụ lastIndexOf(" ") lấy ra vị trí dấu _ cuối cùng : number */
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

        const response = await fetch(`${accountUrl}/third-party-login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...user, firstName, lastName, provider, isThirdParty: true})
        })

        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error}
    }
}

async function GetUserInfo() {
    try {
        const getTokenResponse = await getNextAuthCookies();

        if (getTokenResponse.status_code !== 200) {
            return getTokenResponse;
        }
        const {accessToken, refreshToken} = getTokenResponse;

        const response = await fetch(`${accountUrl}/author`, {
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "X-Refresh-Token": refreshToken,
            }
        });

        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error};
    }
}

async function UpdateProfile(form: FormData) {
    try {

        const getTokenResponse = await getNextAuthCookies();

        if (getTokenResponse.status_code !== 200) {
            return getTokenResponse;
        }

        const {accessToken, refreshToken} = getTokenResponse;

        const response = await fetch(`${accountUrl}/update-profile `, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "X-Refresh-Token": refreshToken
            },
            body: form
        });
        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Lỗi cập nhật thông tin tài khoản", error}
    }
}

async function ReLogin() {
    try {
        const response = await fetch(`${accountUrl}/refresh-token`, {
            credentials: "include"
        });
        const status = response.status;
        const data = await response.json();
        return {status, ...data};
    } catch (error) {
        return {status: 500, message: "Lỗi refresh token", error};
    }
}

async function SoftDelete() {
    try {
        const getTokenResponse = await getNextAuthCookies();

        if (getTokenResponse.status_code !== 200) {
            return getTokenResponse;
        }
        const {accessToken, refreshToken} = getTokenResponse;

        const response = await fetch(`${accountUrl}/soft-delete`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "X-Refresh-Token": refreshToken
            }
        });
        return await response.json();
    } catch (error) {
        return {status: 500, message: "Lỗi xóa tài khoản", error};
    }
}

/*------------------------Server Apis------------------------------------*/

async function getNextAuthCookies() {
    try {
        const response = await fetch("/api/next-auth-cookies", {
            method: "GET"
        });

        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Lỗi lấy token", error}
    }
}

export {
    Register,
    ThirdPartyLogin,
    Login,
    GetUserInfo,
    UpdateProfile,
    ReLogin,
    SoftDelete,
    getNextAuthCookies
}

/*------------------------- Deprecated --------------------------

async function VerifyEmail(email: string) {
    try {
        const response = await fetch(`${accountUrl}/verify-email`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });

        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error};
    }
}

---------------------------------------------------------------------------*/
