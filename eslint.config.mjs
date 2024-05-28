// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

// Run `npx @eslint/config-inspector` to inspect the resolved config interactively
export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: false
  },
  dirs: {
    src: ['./playground']
  }
})
  .prepend({
    plugins: {
      'plugin:prettier/recommended': {}
    }
  })
  .append()
  .overrideRules({
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-console': 'warn'
  })
