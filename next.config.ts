import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    /* config options here */

    reactStrictMode: true, // tạo 2 lần render trong khi dev
    productionBrowserSourceMaps: false, // tạo source map - khi lên product phải để false

    /* next/image */
    /* Docs: https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/daiijshzq/image/upload/**",
                search: ""
            }
        ]
    }
};

export default withNextIntl(nextConfig);
