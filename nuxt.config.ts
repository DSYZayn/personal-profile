// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/styles.css'],
  modules: ['@nuxtjs/tailwindcss'], 
  devServer: {
    host: '0.0.0.0',
    port: 3000
  }
})