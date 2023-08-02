import type {
  Preset,
  SourceCodeTransformer,
} from 'unocss'

import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

import { presetApplet, presetRemRpx, transformerApplet, transformerAttributify } from 'unocss-applet'
import { presetAno } from 'ano-ui'

import { isH5, isMp } from '@uni-helper/uni-env'

const presets: Preset[] = []
const transformers: SourceCodeTransformer[] = []
const darkMode = isH5 ? 'class' : 'media'

if (isMp) {
  presets.push(presetApplet({ dark: darkMode }))
  presets.push(presetRemRpx())
  transformers.push(transformerAttributify({ ignoreAttributes: ['block', 'fixed'] }))
  transformers.push(transformerApplet())
}
else {
  presets.push(presetUno({ dark: darkMode }))
  presets.push(presetAttributify())
  presets.push(presetRemRpx({ mode: 'rpx2rem' }))
}

export default defineConfig({
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'i-flex-center': 'inline-flex justify-center items-center',
    'i-flex-x-center': 'inline-flex justify-center',
    'i-flex-y-center': 'inline-flex items-center',
    'flex-col': 'flex flex-col',
    'flex-col-stretch': 'flex-col items-stretch',
    'i-flex-col': 'inline-flex flex-col',
    'i-flex-col-stretch': 'i-flex-col items-stretch',
    'flex-1-hidden': 'flex-1 overflow-hidden',
    'absolute-lt': 'absolute left-0 top-0',
    'absolute-lb': 'absolute left-0 bottom-0',
    'absolute-rt': 'absolute right-0 top-0',
    'absolute-rb': 'absolute right-0 bottom-0',
    'absolute-tl': 'absolute-lt',
    'absolute-tr': 'absolute-rt',
    'absolute-bl': 'absolute-lb',
    'absolute-br': 'absolute-rb',
    'absolute-center': 'absolute-lt flex-center wh-full',
    'fixed-lt': 'fixed left-0 top-0',
    'fixed-lb': 'fixed left-0 bottom-0',
    'fixed-rt': 'fixed right-0 top-0',
    'fixed-rb': 'fixed right-0 bottom-0',
    'fixed-tl': 'fixed-lt',
    'fixed-tr': 'fixed-rt',
    'fixed-bl': 'fixed-lb',
    'fixed-br': 'fixed-rb',
    'fixed-center': 'fixed-lt flex-center wh-full',
    'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
    'ellipsis-text': 'nowrap-hidden overflow-ellipsis',
    'transition-base': 'transition-all duration-300 ease-in-out',
  },
  presets: [
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    ...presets,
    presetAno(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
    ...transformers,
  ],
  theme: {
    preflightRoot: isMp ? ['page,::before,::after'] : undefined,
  },
})
