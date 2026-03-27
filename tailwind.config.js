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
            boxShadow: {
                'custom-full-default': '0 0 20px 5px rgba(0,0,0,0.25)',   // bóng đều xung quanh
                // 'glow': '0 0 15px 5px rgba(59,130,246,0.5)', // glow xanh
            },
            keyframes: {
                "fade-in": {
                    "0%": {
                        opacity: "0",
                        translate: "40px 40px"
                    },
                    "50%": {
                        opacity: "50",
                        translate: "20px"
                    },
                    "100%": {
                        opacity: "100",
                        translate: "0px"
                    },
                }
            },
            animation: {
                "fade-in": "fade-in 1s ease-in forward"
            }
        },
    },
    plugins: [],
}
