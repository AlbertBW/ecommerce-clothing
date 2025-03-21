import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        print: { raw: "print" }, // Define the print screen
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      minHeight: {
        main: "var(--min-height-calc)",
        small: "var(--min-height-small)",
      },
      maxHeight: {
        main: "var(--max-height-calc)",
      },
    },
  },
  plugins: [],
} satisfies Config;
