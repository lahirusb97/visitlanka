/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bggray: "#D9D9D9",
        textgray: "#656565",
        mred: "#FC3F3F",
        mpurple: "#AA4BF4",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".custom-outline": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
        },
      });
    },
  ],
};
