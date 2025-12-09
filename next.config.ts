import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */

    reactStrictMode: true, // tạo 2 lần render trong khi dev
    productionBrowserSourceMaps: true, // tạo source map - khi lên product phải để false

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

export default nextConfig;
