import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'
import presetWeapp from 'unocss-preset-weapp'
import {
  defaultAttributes,
  defaultIgnoreNonValuedAttributes,
  transformerAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer'
export default defineConfig({
  shortcuts: [
    {
      'flex-center': 'we-flex we-items-center we-justify-center',
    },
  ],
  presets: [
    presetWeapp({
      prefix: 'we-',
    }),
    // presetUno(),
    // presetAttributify({}),
    presetIcons({
      // 其他选项
      prefix: 'i-',
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerAttributify({
      nonValuedAttribute: true,
      classPrefix: 'we-',
      attributes: [...defaultAttributes, 'w', 'h'],
      ignoreNonValuedAttributes: [
        ...defaultIgnoreNonValuedAttributes,
        'flex-center',
      ],
    }),
    transformerClass(),
  ],
})
