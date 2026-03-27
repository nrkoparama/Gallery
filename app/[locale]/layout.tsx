import {ReactNode} from "react";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import ReduxProvider from "@/components/provider/redux-toolkit.provider";
import AuthorContextProvider from "@/components/provider/authorContext.provider";
import NextAuthProvider from "@/components/provider/next-auth.provider";
import Header from "@/components/build/Header/Header";
import Footer from "@/components/build/Footer/Footer";
import {Toaster} from "@/components/ui/sonner";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/authOptions";
import type {Metadata} from "next";

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
    title: "Gallery",
    description: "Website lưu trữ ảnh",
    icons: {
        icon: "./android-chrome-512x512.png"
    }
};

export default async function LocaleLayout({children, params}: Props) {
    const {locale} = await params;
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }
    const messages = await getMessages();

    const session = await getServerSession(authOptions);

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ReduxProvider>
                <AuthorContextProvider>
                    <NextAuthProvider session={session}>
                        <Header/>
                        <main>{children}</main>
                        <Footer/>
                        <Toaster
                            position={`top-center`}
                            swipeDirections={["top", "right"]}
                            richColors={true}
                            duration={2000}
                        />
                    </NextAuthProvider>
                </AuthorContextProvider>
            </ReduxProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    )
}