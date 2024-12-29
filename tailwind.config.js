/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            // that is animation class
            animation: {
                fadeIn: "fadeIn 0.7s ease-in",
                fadeOut: "fadeOut 1s ease-out",
            },

            // that is actual animation
            keyframes: (theme) => ({
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeOut: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
            }),
        },
    },
    plugins: [],
};
