import SocialLoginBtn from "@/app/components/ui/socialLoginBtn";

export default function SocialBtnLayout() {
    const providers = ["google", "facebook"]
    return (
        <div className="w-full flex justify-between">
            {providers.map((p, i: number) => (
                <SocialLoginBtn key={i} provider={p}/>)
            )}
        </div>
    )
}