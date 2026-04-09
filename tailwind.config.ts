import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B2B4B",
          50: "#f0f4fb",
          100: "#dde6f4",
          200: "#c2d1eb",
          300: "#96b2dc",
          400: "#638cc9",
          500: "#406eb5",
          600: "#2f5599",
          700: "#27457c",
          800: "#253b67",
          900: "#1B2B4B",
          950: "#111b30",
        },
        gold: {
          DEFAULT: "#C9A84C",
          50: "#fdf9ed",
          100: "#f9f0d0",
          200: "#f2dfa0",
          300: "#e9c96a",
          400: "#e2b445",
          500: "#C9A84C",
          600: "#b08530",
          700: "#8e6428",
          800: "#754f27",
          900: "#634224",
          950: "#382210",
        },
        cream: {
          DEFAULT: "#FAF8F5",
          50: "#FAF8F5",
          100: "#F0EDE8",
        },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "count-up": "countUp 2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
