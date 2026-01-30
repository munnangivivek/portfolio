/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "comic-yellow": "var(--comic-yellow)",
                "comic-blue": "var(--comic-blue)",
                "comic-green": "var(--comic-green)",
                "comic-red": "var(--comic-red)",
                "comic-black": "var(--comic-black)",
                "comic-white": "var(--comic-white)",
            },
            fontFamily: {
                heading: ["var(--font-comic)", "sans-serif"],
                body: ["var(--font-body)", "sans-serif"],
                comic: ["var(--font-comic)", "cursive"],
            },
            boxShadow: {
                comic: "4px 4px 0px 0px #000000",
                "comic-lg": "8px 8px 0px 0px #000000",
            },
            borderRadius: {
                '4xl': '2rem',
            }
        },
    },
    plugins: [],
}
