"use client";
import {ReactNode} from "react";
import Divider from "@/app/components/ui/divider";
import SocialBtnLayout from "@/app/components/layout/socialBtnLayout";

export default function Form({children, tittle, login}: { children: ReactNode, tittle?: string, login?: boolean }) {
    return (
        <div className={`min-h-screen`}>
            <div className="xl:max-w-[500px] mx-auto pb-6 xl:pt-8">
                <div className="bg-white xl:shadow-xl xl:rounded-lg p-8">

                    {tittle && (
                        <h1 className="text-3xl text-[#00009C] font-bold text-center mb-6">
                            {tittle}
                        </h1>
                    )}

                    {children}

                    {login && (
                        <>
                            {/*Divider*/}
                            <Divider/>

                            {/*Social buttons*/}
                            <SocialBtnLayout className={`w-full`}/>
                        </>
                    )}

                </div>
            </div>
        </div>
    )
}