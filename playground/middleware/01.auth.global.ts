export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (import.meta.client && to.name === 'spa-protected') {
    const { account } = useAppwrite()
    try {
      await account.get()
    }
    catch (error) {
      return await navigateTo('/spa/login')
    }
  }
})
