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
export default defineConfig({
  shortcuts: [
    {
      'flex-center': 'flex items-center justify-center',
    },
    {
      'gradient-bg': 'bg-gradient-to-tr from-#fdfbfb to-#ebedee',
    },
  ],
  presets: [
    presetWeapp({
      prefix: 'u-',
    }),
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
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
