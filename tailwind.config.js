/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        "safe-area": "env(safe-area-inset)",
      },
    },
    fontFamily: {
      slab: ["Roboto Slab", "sans-serif"],
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@headlessui/tailwindcss")({ prefix: "ui" }),
  ],
};
