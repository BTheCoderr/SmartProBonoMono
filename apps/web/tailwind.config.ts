import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7f8fa",
          100: "#eef1f5",
          200: "#d9dee8",
          300: "#b4bdce",
          400: "#8996ae",
          500: "#6a7893",
          600: "#556178",
          700: "#464f62",
          800: "#3c4352",
          900: "#2a2f3a",
        },
        accent: {
          DEFAULT: "#1e3a5f",
          muted: "#2d5a8a",
        },
        surface: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.06), 0 4px 24px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
