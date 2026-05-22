import defaultTheme from "tailwindcss/defaultTheme"

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",

        card: "rgb(var(--card) / <alpha-value>)",
        "card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",

        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",

        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "secondary-foreground": "rgb(var(--secondary-foreground) / <alpha-value>)",

        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",

        neutral: "rgb(var(--neutral) / <alpha-value>)",

        sidebar: "rgb(var(--sidebar) / <alpha-value>)",

        border: "rgb(var(--border) / 0.1)",
        input: "rgb(var(--input) / 0.12)",
        ring: "rgb(var(--ring) / 0.3)",
        destructive: 'rgb(var(--destructive))',
        'destructive-foreground': 'rgb(var(--destructive-foreground))',
        'nav-active': 'rgb(var(--nav-active))',
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      fontFamily: {
        sans: ["Hanken Grotesk", ...defaultTheme.fontFamily.sans],
        serif: ["Newsreader", "serif"],
      },

      boxShadow: {
        ambient: "0px 10px 30px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
}