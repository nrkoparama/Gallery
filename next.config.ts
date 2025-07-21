import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */

    /* next/image */
    /* Docs: https://nextjs.org/docs/pages/api-reference/components/image#remotepatterns */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname:"/daiijshzq/image/upload/**",
                search: ""
            }
        ]
    }
};

export default nextConfig;
