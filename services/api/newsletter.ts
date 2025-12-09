const newsletterUrl = `${process.env.NEXT_PUBLIC_DEV_SERVER_URL}/newsletters/newsletter`

import type {SubscribeNewsLetterForm} from "@/types/Form";

async function SubscribeNewsLetter(form: SubscribeNewsLetterForm) {
    try {
        const response = await fetch(`${newsletterUrl}/subscribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
        return await response.json();
    } catch (error) {
        return {status_code: 500, message: "Lỗi đăng ký nhận tin thất bại", error}
    }
}

export {
    SubscribeNewsLetter
}