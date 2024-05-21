import type { AppwriteClient, AppwriteServer } from './runtime/types'

declare module 'nuxt/schema' {
  interface RuntimeConfig {
    appwrite: AppwriteServer
  }
  interface PublicRuntimeConfig {
    appwrite: AppwriteClient
  }
}
export {}
