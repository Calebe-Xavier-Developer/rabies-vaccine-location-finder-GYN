import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'moss-green': '#355E3B', // Verde musgo escuro
        'gray-brown': '#4E4C4A', // Marrom acinzentado
        'soft-gold': '#F4D03F', // Dourado claro
        'light-beige': '#F5F5DC', // Bege claro
        'off-white': '#FAF9F6', // Branco quebrado
        'light-green': '#B4E197', // Verde claro
        'soft-golden': '#D4AF37', // Dourado suave
        'vibrant-green': '#3CB371', // Verde vibrante
        'burnt-orange': '#E67E22', // Laranja queimado
      },
      screens: {
        'max-sm': { 'max': '1080px' },
        'min-md': {'min': '1081px'},
      }
    },
  },
  plugins: [],
};
export default config;
