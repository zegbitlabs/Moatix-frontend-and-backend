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
        "zb-lime": "#B8F52A",
        "zb-black": "#0B0B0B",
        "zb-paper": "#F4F4F2",
      },
    },
  },
  plugins: [],
} satisfies Config;
