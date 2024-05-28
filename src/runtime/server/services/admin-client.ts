import {
  Client,
  Account,
  Users,
  Teams,
  Databases,
  Storage,
  Avatars,
  Functions,
  Locale,
  Permission,
  Role,
  Query,
  ID,
  AppwriteException
} from 'node-appwrite'
import { type H3Event, getCookie } from 'h3'
import type { AppwriteNode } from '../../types'
import { useRuntimeConfig } from '#imports'

export const useAppwriteSSRAdminClient = (event: H3Event) => {
  const config = useRuntimeConfig(event)
  const requestHeaders = event.node.req.headers

  const localeCookie = getCookie(event, String(config.appwrite.i18nCookieKey))
  const defaultLocale = localeCookie || String(config.appwrite.defaultLocale)

  const client = new Client()
    .setEndpoint(String(config.appwrite.endpoint))
    .setProject(config.appwrite.projectId)
    .setLocale(defaultLocale)
    .setForwardedUserAgent(requestHeaders['user-agent'] as string)
    .setSelfSigned(Boolean(config.appwrite.selfsignedSSL))
    .setKey(config.appwrite.apiKey)

  return {
    get client() {
      return client
    },
    get users() {
      return new Users(client)
    },
    get account() {
      return new Account(client)
    },
    get teams() {
      return new Teams(client)
    },
    get databases() {
      return new Databases(client)
    },
    get avatars() {
      return new Avatars(client)
    },
    get storage() {
      return new Storage(client)
    },
    get functions() {
      return new Functions(client)
    },
    get locale() {
      return new Locale(client)
    },
    get Permission() {
      return Permission
    },
    get Role() {
      return Role
    },
    get Query() {
      return Query
    },
    get ID() {
      return ID
    },
    get AppwriteException() {
      return AppwriteException
    }
  } satisfies AppwriteNode
}
