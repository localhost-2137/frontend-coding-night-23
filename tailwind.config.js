/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgClr: "#2e2f30",
        bgLght: "#525252",
      },
    },
  },
  plugins: [],
};
