// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // When deploying to GitHub Pages under a repository path (e.g. https://<user>.github.io/personal-profile/)
  // set the app.baseURL so built HTML and asset URLs include the repo name prefix.
  app: {
    baseURL: '/personal-profile/'
  },
  css: ['~/assets/styles.css'],
  modules: ['@nuxtjs/tailwindcss']
})