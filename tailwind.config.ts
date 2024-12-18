import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors');
const config: Config = {
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
        primary: colors.zinc
      },
      fontSize: {
        tiny: '0.6rem'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-geist-mono)']
      },
      transitionProperty: {
        'height': 'height',
        'max-height': 'max-height',
        'spacing': 'margin, padding',
      },
      boxShadow: {
        'inner-md': 'inset 0 4px 4px 0 rgb(0 0 0 / 0.2)'
      }
    },
  },
  safelist: [
    "bg-gradient-to-br from-slate-600 to-slate-400",
    "bg-gradient-to-br from-zinc-600 to-zinc-400",
    "bg-gradient-to-br from-sky-600 to-slate-400",
    "bg-gradient-to-br from-sky-950 to-slate-600",
    "bg-gradient-to-br from-blue-700 to-sky-500",
    "bg-gradient-to-br from-blue-950 to-sky-900",
  ],
  plugins: [],
  darkMode: "class"
};
export default config;
