import { i18n } from '~/modules'

export function useLanguage() {
  const { locale } = i18n.global
  const languageOptions = [
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
  const language = ref<'auto' | 'zh-CN' | 'en-US'>(uni.getStorageSync('language') || 'auto')

  watch(language, (v) => {
    uni.setStorageSync('language', v)
  })
  const systemLanguage = ref('zh-CN')
  // #ifdef MP-WEIXIN
  systemLanguage.value = uni.getAppBaseInfo().language
  // #endif

  // #ifdef H5
  systemLanguage.value = navigator.language
  // #endif
  watch(language, (v) => {
    if (v === 'auto') {
      locale.value = systemLanguage.value
    }
    else {
      locale.value = v
    }
  })
  function toggle() {
    locale.value = locale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  }
  function setLocale(lang: 'zh-CN' | 'en-US' | string) {
    locale.value = lang
  }
  function setLanguage(lang: 'zh-CN' | 'en-US' | 'auto') {
    language.value = lang
  }
  return {
    locale,
    language,
    languageOptions,
    systemLanguage,
    toggle,
    setLocale,
    setLanguage,
  }
}
