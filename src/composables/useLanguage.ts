import { i18n } from '~/modules'

const { locale: language } = i18n.global
function toggleLanguage(lang?: 'cn' | 'en') {
  if (lang)
    language.value = lang
  else
    language.value = language.value === 'cn' ? 'en' : 'cn'
}
export function useLanguage() {
  return {
    language: language as WritableComputedRef<'cn' | 'en'>,
    toggleLanguage,
  }
}
