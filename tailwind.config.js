/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use class strategy because the app toggles the `dark` class on <html>
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
