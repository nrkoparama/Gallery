import SocialLoginButton from "@/components/build/SocialLoginButton";

const providers = ["google", "facebook"]

export default function SocialLoginButtonWrapper({className}: { className?: string }) {
    return (
        <div className={`${className} grid grid-cols-2 gap-4 xl:gap-5`}>
            {providers.map((p, i: number) => (
                    <SocialLoginButton key={i} provider={p}/>
                )
            )}
        </div>
    )
}