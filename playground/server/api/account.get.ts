import { useAppwriteSSRSessionClient } from '#nuxt-appwrite-ssr'

export default defineEventHandler(async (event) => {
  const { account, AppwriteException } = useAppwriteSSRSessionClient(event)

  try {
    return await account.get()
  } catch (error: any) {
    if (error instanceof AppwriteException) {
      return createError({
        statusCode: error.code,
        statusMessage: error.message,
        message: error.name
      })
    }
    return createError(error)
  }
})
