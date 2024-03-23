/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Define custom scrollbar colors
      colors: {
        'scrollbar-thumb': '#4caf50', // Sample thumb color
        'scrollbar-track': '#e0e0e0', // Sample track color
      },
      // Extend the scrollbar width and radius
      scrollbar: {
        width: '8px',
        borderRadius: '10px',
      },
    },
  },
  plugins: [],
}
