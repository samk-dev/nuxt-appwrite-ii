export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtAppwrite: {
    client: {
      projectId: import.meta.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID,
    },
    server: {
      enabled: true,
      projectId: import.meta.env.NUXT_PUBLIC_APPWRITE_PROJECT_ID,
      apiKey: import.meta.env.NUXT_PROJECT_API_KEY,
    },
  },
  devtools: { enabled: true },
})
