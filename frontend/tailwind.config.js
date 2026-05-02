/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: {
          50: "#FFF0F5",
          100: "#FFE4EC",
          200: "#FFC7D8",
          300: "#FFA0C0",
          400: "#FF85A8",
          500: "#FF6F91",
          600: "#FF4D77",
          700: "#E03560",
          800: "#B82A4E",
          900: "#8E1F3C",
        },
        purple: {
          300: "#C9A0F5",
          400: "#B57BEE",
          500: "#9D4EDD",
          600: "#7B2FBE",
          700: "#5E1F9E",
        },
        teal: {
          300: "#7EDDD6",
          400: "#4ECDC4",
          500: "#3BAFA7",
        },
        amber: {
          300: "#FFD07B",
          400: "#FFB347",
          500: "#E69A30",
        },
        red: {
          300: "#FF9E9E",
          400: "#FF6B6B",
          500: "#E05555",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "Consolas", "monospace"],
      },
      borderRadius: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(255,111,145,0.10)",
        hover: "0 8px 40px rgba(255,111,145,0.20)",
        glow: "0 0 30px rgba(157,78,221,0.25)",
      },
      animation: {
        "gradient-shift": "gradientShift 8s ease infinite",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
