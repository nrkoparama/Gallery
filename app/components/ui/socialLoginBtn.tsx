import Image from "next/image";
import {getSession, signIn} from "next-auth/react";

export default function SocialLoginBtn({provider}: { provider: string }) {
    const handleSignIn = async (p: string) => {
        try {
            const response = await signIn(p, {callbackUrl: "/"});

            if (response?.error) {
                console.error("Lỗi đăng nhập () :", response.error);
                return;
            }

            let session = null;
            let retries = 10;
            while (!session && retries > 0) {
                await new Promise((resolve) => setTimeout(resolve, 500));
                session = await getSession();
                console.log(`Lần thử ${10 - retries}:`, session);
                retries--;
            }

            if (!session || !session.user) {
                console.error("Session không có user, dừng request.");
                return;
            }

        } catch (error) {
            console.error("Lỗi trong handleSignIn:", error);
        }
    };
    return (
        <button
            type="button"
            onClick={() => handleSignIn(provider)}
            className="w-[48%] h-10 hover:bg-gray-50 border border-gray-300 rounded-lg flex justify-center items-center gap-2 transition-all duration-200 hover:cursor-pointer"
        >
            <Image
                src={`/assets/icons/${provider}-icon.webp`}
                alt={provider}
                width={24}
                height={24}
            />
            <p className={`capitalize`}>{provider}</p>
        </button>
    )
}