import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import presetWeapp from 'unocss-preset-weapp';
import {
  defaultAttributes,
  defaultIgnoreNonValuedAttributes,
  transformerAttributify,
  transformerClass,
} from 'unocss-preset-weapp/transformer';
export default defineConfig({
  shortcuts: [
    {
      'flex-center': 'c-flex c-items-center c-justify-center',
    },
  ],
  presets: [
    presetWeapp({
      prefix: 'c-',
    }),
    // presetUno(),
    // presetAttributify({}),
    presetIcons({
      // 其他选项
      prefix: 'i-',
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
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
    transformerAttributify({
      nonValuedAttribute: true,
      classPrefix: 'c-',
      attributes: [...defaultAttributes, 'w', 'h'],
      ignoreNonValuedAttributes: [
        ...defaultIgnoreNonValuedAttributes,
        'flex-center',
      ],
    }),
    transformerClass(),
  ],
});
