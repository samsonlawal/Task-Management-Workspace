import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        madei: ["madei", "sans-serif"],
      },
      fontWeight: {
        thin: "100",
        regular: "300",
        normal: "400",
        medium: "500",
        black: "900",
      },
    },
  },
  plugins: [],
} satisfies Config;
