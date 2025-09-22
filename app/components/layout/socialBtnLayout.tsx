import SocialLoginBtn from "@/app/components/ui/socialLoginBtn";

export default function SocialBtnLayout({className}:{className?:string}) {
    const providers = ["google", "facebook"]
    return (
        <div className={`${className} grid grid-cols-2 gap-4 xl:gap-5`}>
            {providers.map((p, i: number) => (
                    <SocialLoginBtn key={i} provider={p}/>
                )
            )}
        </div>
    )
}