import {getTranslations} from 'next-intl/server';
import HomeLayout from "@/components/build/Home/HomeLayout";

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
    const {locale} = await props.params;
    const t = await getTranslations({locale, namespace: 'Metadata'});

    return {
        title: t('title')
    };
}

export default function HomePage() {
    return <HomeLayout/>
}