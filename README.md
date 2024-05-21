# Nuxt Appwrite II

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Appwrite Client and Server integration for Nuxt. It'a a bit opinionated to suit the projects I am working on, feel free to use it but before using please checkout [nuxt-appwrite-ii by @Hrdtr](https://nuxt.com/modules/appwrite)

- [✨ &nbsp;Changelog](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-appwrite-ii?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

- Web SDK
- Server Side SDK
- i18n ready
- Use one at a time or both
- flexibility to have different connections per SDK

## Quick Setup

Install Appwrite official SDK's. The module doesn't install them for better flexibility.

```bash
# Web SDK

npm install appwrite

pnpm add appwrite

yarn install appwrite

# Server side

npm install node-appwrite

pnpm add node-appwrite

yarn install node-appwrite

### ⚠️ THE CURRENT STABLE VERSION OF NODE APPWRITE HAS ISSUES ON EDGE RUNTIMES. TEMPORARY WORKAROUND IS TO INSTALL node-appwrite@next WILL FIX THE ISSUE ⚠️ ###
```

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-appwrite-ii
```

That's it! You can now use Nuxt Appwrite II in your Nuxt app

## Web SDK

Add your Appwrite credentials.

- `enabled` Enable/Disable Web SDK - default `true`
- `endpoint` The default endpoint is `https://cloud.appwrite.io/v1`
- `projectId` Project ID __the module will not load if missing__
- `defaultLocale` default `en-US`

```ts
export default defineNuxtConfig({
  // ...restOfConfig
  modules: ['nuxt-appwrite-ii'],
  nuxtAppwrite: {
    client: {
      enabled: true,
      endpoint: 'https://cloud.appwrite.io/v1',
      projectId: '', // required**
      defaultLocale: 'en-US'
    },
  },
  // ...restOfConfig
})
```

### `useAppwrite` composable

You can destructure `account, databases, functions, storage, teams, avatars, locale, Permission, Query, Role, AppwriteException, ID` from `useAppwrite()`

```ts
const { account } = useAppwrite()

// example getting current loggedin account
try {
  const user = await account.get()
  console.log(user)
} catch (error) {
  console.log(error)
}
```

## Server Side

Add your Appwrite credentials.

- `enabled` Enable/Disable Web SDK - default `false`
- `endpoint` The default endpoint is `https://cloud.appwrite.io/v1`
- `projectId` Project ID __the module will not load if missing__
- `apiKey` Api Key __the module will not load if missing__
- `defaultLocale` default `en-US`

The server side integration should be used with caution as it exposes 2 clients, `useAppwriteSSRAdminClient` and `useAppwriteSSRSessionClient`

### `useAppwriteSSRAdminClient` Server Util

This composable needs an `API KEY` with at least `session.create` permissions. It can be used to create sessions,
do administrative tasks. *__CAUTION WITH WHAT YOU DO WITH THE UTIL AS IT ACTS ON BEHALF OF APPWRITE SUPER ADMIN AND BYPASS ANY RATE LIMITS AND PERMISSIONS__*

```ts
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

```

### `useAppwriteSSRSessionClient` Server Util

This composable is used after the `useAppwriteSSRAdminClient` as it uses the session created. And will respect any applied rate limits and permissions for the user.

```ts
import { useAppwriteSSRSessionClient } from '#nuxt-appwrite-ssr'

export default defineEventHandler(async (event) => {
  const { account, AppwriteException } = useAppwriteSSRSessionClient(event)

  try {
    return await account.get()
  }
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

```

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

## Credits

- Inspiration -> Nuxt Supabase Module

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-appwrite-ii/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-appwrite-ii

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-appwrite-ii.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-appwrite-ii

[license-src]: https://img.shields.io/npm/l/nuxt-appwrite-ii.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-appwrite-ii

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
