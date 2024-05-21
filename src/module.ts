import { fileURLToPath } from 'node:url'
import { defineNuxtModule, addPlugin, createResolver, addTemplate, addImports, extendViteConfig } from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import type { ModuleOptions } from './runtime/types'

const defaultEndpoint = 'https://cloud.appwrite.io/v1'
const defaultLocale = 'en'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'nuxtAppwrite',
    compatibility: {
      nuxt: '^3.0.0',
      bridge: false,
    },
  },
  defaults: {
    client: {
      enabled: true,
      endpoint: defaultEndpoint,
      projectId: '',
      defaultLocale,
    },
    server: {
      enabled: false,
      endpoint: defaultEndpoint,
      projectId: '',
      apiKey: '',
      defaultLocale,
      cookieName: 'a_session',
      i18nCookieKey: 'i18nCookieKey',
      selfsignedSSL: false,
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const nuxtOpts = nuxt.options
    const moduleRuntimeDir = resolve('./runtime')

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.options.alias['#nuxt-appwrite'] = resolve(runtimeDir)

    addTemplate({
      filename: 'types/appwrite.d.ts',
      getContents: () => `
        import type { AppwriteClient, AppwriteServer } from '#nuxt-appwrite/types'

        declare module 'nuxt/schema' {
          interface RuntimeConfig {
            appwrite: AppwriteServer;
          }
          interface PublicRuntimeConfig {
            appwrite: AppwriteClient;
          }
        }
        export {};
      `,
    })

    if (options.client?.enabled && !options.client.projectId) {
      console.warn('Nuxt Appwrite II: client config missing project id, web client will not load ⚠️')
    }
    else {
      nuxtOpts.runtimeConfig.public.appwrite = defu(
        nuxtOpts.runtimeConfig.public.appwrite,
        options.client,
      )

      extendViteConfig((config) => {
        config.optimizeDeps ||= {}
        config.optimizeDeps.include ||= []
        config.optimizeDeps.include.push('appwrite')
      })
      nuxtOpts.build.transpile.push('appwrite')

      addPlugin(`${moduleRuntimeDir}/plugins/appwrite`)
      addImports({
        name: 'useAppwrite',
        as: 'useAppwrite',
        from: resolve(moduleRuntimeDir, 'composables/useAppwrite'),
      })
    }

    const isServerConfigEnabled = options.server?.enabled
    if (
      (isServerConfigEnabled && !options.server?.projectId)
      || (isServerConfigEnabled && !options.server?.apiKey)
    ) {
      console.warn('Nuxt Appwrite II: server config missing project id or api key, server client will not load ⚠️')
    }
    else {
      nuxtOpts.runtimeConfig.appwrite = defu(
        nuxtOpts.runtimeConfig.appwrite,
        options.server,
      )

      nuxt.hook('nitro:config', (nitroConfig) => {
        nitroConfig.alias = nitroConfig.alias || {}
        nitroConfig.externals = defu(typeof nitroConfig.externals === 'object' ? nitroConfig.externals : {}, {
          inline: [resolve('./runtime')],
        })
        nitroConfig.alias['#nuxt-appwrite-ssr'] = resolve('./runtime/server/services')
      })

      extendViteConfig((config) => {
        config.optimizeDeps ||= {}
        config.optimizeDeps.include ||= []
        config.optimizeDeps.include.push('node-appwrite')
      })
      nuxtOpts.build.transpile.push('node-appwrite')
    }
  },
})
