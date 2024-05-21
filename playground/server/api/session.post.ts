import { useAppwriteSSRAdminClient } from '#nuxt-appwrite-ssr'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<{ email: string, password: string }>(event)
  const { account, AppwriteException } = useAppwriteSSRAdminClient(event)

  const config = useRuntimeConfig(event)

  try {
    const session = await account.createEmailPasswordSession(email, password)

    setCookie(event, config.appwrite.cookieName, session.secret, {
      expires: new Date(session.expire),
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })

    return { status: 'success', message: 'session created' }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    if (error instanceof AppwriteException) {
      return createError({
        statusCode: error.code,
        statusMessage: error.message,
        message: error.name,
      })
    }
    return createError(error)
  }
})
