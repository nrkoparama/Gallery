import {signIn} from "next-auth/react";
import Image from "next/image";


export default function SocialLoginBtn({provider}: { provider: string }) {

    const handleSignIn = async (p: string) => {
        try {

            const signInAction = await signIn(p, {redirect: true, callbackUrl: `/?login=true&provider=${p}`});

            if (signInAction?.error) {
                console.error("Ủy quyền thất bại");
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
            className="col-span-2 xl:col-span-1 py-2.5 xl:py-2 hover:bg-gray-100 border border-gray-300 rounded-lg transition-all duration-200 hover:cursor-pointer"
        >
            <div className={`flex justify-center items-center gap-3`}>
                <div className={`flex justify-end`}>
                    <Image
                        src={`/assets/icons/${provider}-icon.webp`}
                        alt={provider}
                        width={24}
                        height={24}
                    />
                </div>

                <p className={`block w-[20%] text-left sm:hidden capitalize`}>{provider}</p>

                {/*chỉ hiện pc*/}
                <p className={`hidden xl:block text-gray-500 capitalize`}>{provider}</p>
            </div>

        </button>

    )
}