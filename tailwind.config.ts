import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cardground: "#F6F7F5",
        buttong1: "#FB8D8D",
        buttong2: "#5B00FF",
        border1: "#D4D4D4",
        textColor1: "#7B7B7A",
      },
      fontFamily: {
        Manrope: ['Manrope'],
      },
      spacing: {
        '482': '30.1rem',
      },
    },
  },
  plugins: [],
};
export default config;
