import type {Metadata} from "next";
import "./globals.css";
import {ReactNode} from "react";
import NextAuthProvider from "@/app/components/provider/next-auth.provider";
import ReduxProvider from "@/app/components/provider/redux-toolkit.provider";
import {Toaster} from "@/components/ui/sonner";

import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";

export const metadata: Metadata = {
    title: "Gallery",
    description: "Website lưu trữ ảnh",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
        <body className={`tracking-wide antialiased mx-4 lg:mx-7 xl:mx-12`}>
        <ReduxProvider>
            <NextAuthProvider session={session}>
                {children}
                <Toaster position={`top-center`}/>
            </NextAuthProvider>
        </ReduxProvider>
        </body>
        </html>
    );
}
