import messages from '@intlify/unplugin-vue-i18n/messages'
import { createI18n } from 'vue-i18n'
import en from '~/locales/en-US.json'
import zh from '~/locales/zh-CN.json'

type Locale = 'zh-CN' | 'en-US'
type Language = 'auto' | Locale
let _messages = {

}
const language = ref<Language>(uni.getStorageSync('__LANGUAGE__PERSIST__') || 'auto')
watch(language, (v) => {
  uni.setStorageSync('__LANGUAGE__PERSIST__', v)
})

const navigatorLanguage = ref('zh-CN')
// #ifdef MP-WEIXIN
navigatorLanguage.value = uni.getLocale()
_messages = {
  'zh-CN': zh,
  'en-US': en,
}
// #endif

// #ifdef H5
navigatorLanguage.value = navigator.language
_messages = { ...messages }
// #endif
const _locale = language.value === 'auto' ? navigatorLanguage.value : language.value
export const languageOptions = [
  {
    label: '自动',
    value: 'auto',
  },
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en-US',
  },
]
export const i18n = createI18n({
  locale: _locale ?? 'zh-CN',
  legacy: false,
  fallbackLocale: 'zh-CN',
  messages: _messages,
})

export function useLanguage() {
  const { locale } = i18n.global

  watch(language, (v) => {
    locale.value = v === 'auto' ? navigatorLanguage.value as Locale : v
  })
  watch(navigatorLanguage, (v) => {
    if (language.value === 'auto') {
      locale.value = v as Locale
    }
  })
  function toggle() {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }
  function setLocale(lang: Locale) {
    locale.value = lang
  }
  function setLanguage(lang: Language) {
    language.value = lang
  }
  return {
    locale,
    language,
    navigatorLanguage,
    toggle,
    setLocale,
    setLanguage,
  }
}
