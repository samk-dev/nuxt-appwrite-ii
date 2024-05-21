import type {
  Account,
  Avatars,
  Databases,
  Functions,
  Storage,
  Locale,
  Teams,
  Client,
  Permission,
  Query,
  Role,
  AppwriteException,
  ID,
} from 'appwrite'
import type {
  Account as AccountSSR,
  Users as UsersSSR,
  Avatars as AvatarsSSR,
  Databases as DatabasesSSR,
  Functions as FunctionsSSR,
  Storage as StorageSSR,
  Locale as LocaleSSR,
  Teams as TeamsSSR,
  Client as ClientSSR,
  Permission as PermissionSSR,
  Query as QuerySSR,
  Role as RoleSSR,
  AppwriteException as AppwriteExceptionSSR,
  ID as IDSSR,
} from 'node-appwrite'

// TODO: export appwrite MODEL types

// appwrite client
export type Appwrite = {
  client: Client
  account: Account
  avatars: Avatars
  databases: Databases
  functions: Functions
  locale: Locale
  storage: Storage
  teams: Teams
  Permission: typeof Permission
  Query: typeof Query
  Role: typeof Role
  AppwriteException: typeof AppwriteException
  ID: typeof ID
}
export type AppwriteNode = {
  client: ClientSSR
  account: AccountSSR
  users: UsersSSR
  avatars: AvatarsSSR
  databases: DatabasesSSR
  functions: FunctionsSSR
  locale: LocaleSSR
  storage: StorageSSR
  teams: TeamsSSR
  Permission: typeof PermissionSSR
  Query: typeof QuerySSR
  Role: typeof RoleSSR
  AppwriteException: typeof AppwriteExceptionSSR
  ID: typeof IDSSR
}
// config
type AppwriteCommonConfig = {
  /**
   * Appwrite instance api url
   *
   * @default 'https://cloud.appwrite.io/v1'
   */
  endpoint?: string
  /**
   * Appwrite project id
   *
   */
  projectId: string
  /**
   * Appwrite default locale
   *
   * @default 'en'
   */
  defaultLocale?: string
}
export type AppwriteClient = AppwriteCommonConfig & {
  /**
   * Enable/Disable Appwrite client SDK
   *
   * @default true
   */
  enabled?: boolean
}
export type AppwriteServer = AppwriteCommonConfig & {
  /**
   * Enable/Disable Appwrite Node SDK
   *
   * @default false
   */
  enabled?: boolean
  /**
   * API Key with at lease Create Session permissions
   */
  apiKey: string
  /**
   * Session cookie name
   *
   * @default 'a_session'
   */
  cookieName?: string
  /**
   * i18n cookie name
   *
   * @default 'cookieKey'
   */
  i18nCookieKey?: string
  /**
   * Enable/Disable Selfsigned SSL certificates
   * usefuel during development
   *
   * @default false
   */
  selfsignedSSL?: false
}
export interface ModuleOptions {
  /**
   * Appwrite client SDK
   */
  client?: AppwriteClient
  /**
   * Appwrite Node SDK
   */
  server?: AppwriteServer
}
