import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  formatters: true,
  ignores: [
    'src/manifest.json',
    'src/pages.json',
    '**/uni_modules',
  ],
})
