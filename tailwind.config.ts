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
        placeholder: "hsl(var(--placeholder))",
        inactive: "hsl(var(--inactive))",
        purple: "hsl(var(--purple))",
        pink: "hsl(var(--pink))",
        extra: "hsl(var(--extra))",
        first: {
          DEFAULT: "hsl(var(--first))",
          foreground: "hsl(var(--first-foreground))",
          stroke: "hsl(var(--first-stroke))",
        },
        second: {
          DEFAULT: "hsl(var(--second))",
          foreground: "hsl(var(--second-foreground))",
          stroke: "hsl(var(--second-stroke))",
        },
        third: {
          DEFAULT: "hsl(var(--third))",
          foreground: "hsl(var(--third-foreground))",
          third: "hsl(var(--third-stroke))",
        },
        disable: {
          DEFAULT: "hsl(var(--disable))",
          foreground: "hsl(var(--disable-foreground))",
          stroke: "hsl(var(--disable-stroke))",
        },
        negative: {
          DEFAULT: "hsl(var(--negative))",
          foreground: "hsl(var(--negative-foreground))",
          stroke: "hsl(var(--negative-stroke))",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          foreground: "hsl(var(--highlight-foreground))",
          stroke: "hsl(var(--highlight-stroke))",
        },
        invert: {
          DEFAULT: "hsl(var(--invert))",
          foreground: "hsl(var(--invert-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        positive: {
          DEFAULT: "hsl(var(--positive))",
          foreground: "hsl(var(--positive-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        h1: "36px",
        h2: "32px",
        h3: "28px",
        h4: "24px",
        h5: "20px",
        l: "16px",
        m: "14px",
        s: "12px",
      },
      fontWeight: {
        bold: "700",
        medium: "400",
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
