import {
  Client,
  Account,
  AppwriteException,
  Avatars,
  Databases,
  Functions,
  ID,
  Locale,
  Permission,
  Query,
  Role,
  Storage,
  Teams,
} from 'appwrite'
import type { Appwrite } from '../types'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'nuxt-appwrite',
  setup(nuxtApp) {
    const config = nuxtApp.$config.public.appwrite

    // TODO: set the locale based on nuxt-i18n
    const client = new Client()
      .setEndpoint(String(config.endpoint))
      .setProject(config.projectId)
      .setLocale(String(config.defaultLocale))

    return {
      provide: {
        appwrite: {
          client,
          account: new Account(client),
          avatars: new Avatars(client),
          databases: new Databases(client),
          functions: new Functions(client),
          locale: new Locale(client),
          storage: new Storage(client),
          teams: new Teams(client),
          Permission,
          Query,
          Role,
          AppwriteException,
          ID,
        } satisfies Appwrite,
      },
    }
  },
})
