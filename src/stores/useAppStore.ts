import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const darkMode = ref(false)
    const { locale } = useI18n()
    const language = ref<'zh_cn' | 'en_us'>('zh_cn')
    watch(language, language => (locale.value = language))

    return {
      language,
      darkMode,
    }
  },
  {
    persist: {
      key: '__app__',
      paths: [''],
    },
  },
)
