import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0f172a", // Slate 900
                foreground: "#f8fafc", // Slate 50
                slate: {
                    850: '#151e32',
                    950: '#020617',
                },
                primary: {
                    DEFAULT: '#A855F7', // Purple 500
                    foreground: '#ffffff',
                    glow: '#a855f780', // 50% opacity
                },
                accent: {
                    cyan: '#06B6D4',
                    emerald: '#10B981',
                    rose: '#F43F5E',
                }
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                heading: ["var(--font-outfit)", "sans-serif"],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #A855F7 0deg, #3B82F6 180deg, #A855F7 360deg)',
            }
        },
    },
    plugins: [],
};
export default config;
