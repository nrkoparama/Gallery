"use client";
import {HTMLAttributes, ReactNode} from "react";
import Divider from "@/components/build/Divider";
import SocialLoginButtonWrapper from "@/components/build/SocialLoginButtonWrapper";

interface FormProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    title: string,
    thirdPartyLogin: boolean
}

export default function FormLayout({children, title, thirdPartyLogin, ...props}: FormProps) {
    return (
        <div className={`min-h-screen`} {...props}>
            <div className={`md:max-w-[500px] mx-auto md:pt-14 pb-6`}>
                <div className="bg-white md:shadow-xl md:rounded-lg p-8">

                    {title && (
                        <h1 className="text-3xl text-[#00009C] font-bold text-center mb-6">
                            {title}
                        </h1>
                    )}

                    {/*Form content*/}
                    {children}

                    {thirdPartyLogin && (
                        <>
                            {/*Divider*/}
                            <Divider/>

                            {/*Social buttons*/}
                            <SocialLoginButtonWrapper className={`w-full`}/>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}