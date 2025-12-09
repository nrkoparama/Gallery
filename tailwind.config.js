/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // nếu dùng Next.js
        "./src/**/*.{js,ts,jsx,tsx}",  // Pages Router
        "./app/**/*.{js,ts,jsx,tsx}", // App Router
        "./components/**/*.{js,ts,jsx,tsx}",
        // "./index.html", // nếu dùng Vite
    ],
    theme: {
        extend: {
            // fontFamily: {
            //     beVietnamPro: ["var(--font-be-vietnam-pro)", "sans-serif"], // font chính ( body text)
            //     playFair: ["var(--font-playfair)", "serif"], // font cho hading / title
            //     firaCode: ["var(--font-fira-code)", "monospace"] // font cho block code
            // },
            boxShadow: {
                'custom-full-default': '0 0 20px 5px rgba(0,0,0,0.25)',   // bóng đều xung quanh
                // 'glow': '0 0 15px 5px rgba(59,130,246,0.5)', // glow xanh
            },
            // animation:{
            //     bounce: "var(--animate-bounce)"
            // },
            // keyframe:{
            //     customBounceAnimation:{
            //         "0%":
            //     }
            // }
        },
    },
    plugins: [],
}
