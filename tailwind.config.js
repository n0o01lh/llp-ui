/** @type {import('tailwindcss').Config} */
import tailwindcss from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  theme: {
    extend: {
      borderRadius: {
        lg: "var(0.5rem)",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      colors: {
        background: "#fff",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "#fff",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "#fff",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#18181A",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "#EEEEEF",
          foreground: "#A4A4A9",
        },
        accent: {
          DEFAULT: "#f2f2f2",
          foreground: "#000",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "#EEEEEF",
        input: "#EEEEEF",
        ring: "#A1A1AA",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
