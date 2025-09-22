const mailURl = `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/mails`;

async function SendMail(email: string) {

    try {
        const res = await fetch(`${mailURl}/send-otp`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        });
        return await res.json();
    } catch (error) {
        return {status_code: 500, message: "Có lỗi. Vui lòng thử lại sau!", error}
    }
}

async function ResetPassword() {
}

async function RecoveryAccount() {
}

export {
    SendMail,
    ResetPassword,
    RecoveryAccount
}