import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
    // https://next-intl.dev/docs/routing/configuration
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localePrefix: {
        mode: "as-needed",
        // prefixes: {
        //     'en': '/us'
        // }
    },
    pathnames: {
        "/": "/",
        "/account/register/verify-email": {
            en: "/account/register/verify-email",
            vi: "/tai-khoan/dang-ky/xac-thuc-email"
        },
        "/account/register": {
            en: "/account/register",
            vi: "/tai-khoan/dang-ky"
        },
        "/account/login": {
            en: "/account/login",
            vi: "/tai-khoan/dang-nhap"
        },
        "/account/setting/profile": {
            en: "/account/setting/profile",
            vi: "/tai-khoan/cai-dat/thong-tin-tai-khoan"
        },
        "/account/setting/notification": {
            en: "/account/setting/notification",
            vi: "/tai-khoan/cai-dat/thong-bao"
        },
        "/account/setting/security": {
            en: "/account/setting/security",
            vi: "/tai-khoan/cai-dat/bao-mat"
        },
    }
});
