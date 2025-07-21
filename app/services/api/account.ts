const accountUrl = `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/authors/author`;
// const prodUrl = "";

import type {LoginType, RegisterType, UpdateProfile} from "@/types/Author";

async function VerifyEmail(email: string) {
    try {
        const res = await fetch(`${accountUrl}/email-verify`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email})
        });
        const status = res.status;
        const data = await res.json();
        return {status, ...data};
    } catch (error) {
        return {status: 500, message: "Lỗi xác thực email", error};
    }
}

async function Register(form: RegisterType) {
    try {
        const res = await fetch(`${accountUrl}/register`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...form, isThirdParty: false}),
            }
        );
        const status = res.status;
        const data = await res.json();
        return {status, ...data};
    } catch (error) {
        return {status: 500, message: "Lỗi tạo tài khoản ()", error};
    }
}

async function Login(form: LoginType) {
    try {
        const res = await fetch(`${accountUrl}/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...form}),
            }
        );
        const status = res.status;
        const data = await res.json();
        return {status, ...data};
    } catch (error) {
        return {status: 500, message: "Lỗi đăng nhập", error};
    }
}

async function GetUserInfo() {
    try {
        const res = await fetch(`${accountUrl}`, {credentials: "include"});
        const status = res.status;
        const data = await res.json();
        return {status, ...data};
    } catch (error) {
        return {status: 500, message: "Lỗi lấy thông tin tài khoản", error};
    }
}

async function UpdateProfile(form: FormData) {
    try {
        const response = await fetch(`${accountUrl}/update-profile `, {
            method: "PATCH",
            credentials: "include",
            body: form
        });
        const status = response.status;
        const data = await response.json();
        return {status, ...data};
    } catch (error) {
        return {status: 500, message: "Lỗi cập nhật thông tin tài khoản ()", error}
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

export {
    VerifyEmail,
    Register,
    Login,
    GetUserInfo,
    UpdateProfile,
    ReLogin
}
