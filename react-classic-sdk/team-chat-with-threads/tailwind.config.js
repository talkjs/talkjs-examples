/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          '100': 'rgb(247, 247, 247)', // Accent 1
          '200': 'rgb(236, 236, 236)', // Accent 2
          '300': 'rgb(212, 212, 212)', // Accent 3
          '400': 'rgb(163, 163, 163)', // Accent 4
          '500': 'rgb(115, 115, 115)', // Accent 5
          '600': 'rgb(82, 82, 82)',    // Accent 6
          '700': 'rgb(64, 64, 64)',    // Accent 7
          '800': 'rgb(38, 38, 38)',    // Accent 8
          '900': 'rgb(17, 17, 17)',    // Accent 9
        },
        blue: {
          '400': 'rgb(50, 145, 255)',  // Light
          '500': 'rgb(0, 125, 249)',   // Default
          '600': 'rgb(0, 122, 255)',   // Dark
          '700': 'rgb(7, 97, 209)',    // Darker
        }
      }
    },
  },
  plugins: [],
}

