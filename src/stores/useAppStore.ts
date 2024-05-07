import { defineStore } from 'pinia'

export const useAppStore = defineStore(
  'appStore',
  () => {
    return {

    }
  },
  {
    persist: {
      key: '__APP_STORE_PERSIST__',
      paths: [''],
      storage: {
        setItem: (key, value) => {
          try {
            return uni.setStorageSync(key, value)
          }
          catch (error) {
            return false
          }
        },
        getItem: (key) => {
          try {
            return uni.getStorageSync(key)
          }
          catch (error) {
            return false
          }
        },
      },
    },
  },
)
