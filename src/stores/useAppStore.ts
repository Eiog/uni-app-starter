import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    const { language } = useLanguage()
    return {
      language,
    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      pick: [''],
      storage: {
        setItem: (key, value) => uni.setStorageSync(key, value),
        getItem: key => uni.getStorageSync(key),
      },
    },
  },
)
