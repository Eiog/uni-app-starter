import { defineStore } from 'pinia'
import type { DialogInst, NotifyInst, ToastInst } from 'nutui-uniapp'

interface MenuButtonBoundingClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}
export const useAppStore = defineStore(
  'appStore',
  () => {
    const darkMode = ref(false)
    const isLogin = ref(false)
    const { locale } = useI18n()
    const language = ref<'zh_cn' | 'en_us'>('zh_cn')
    watch(language, language => (locale.value = language))
    const loading = ref(false)
    const toastRef = ref<ToastInst>()
    const notifyRef = ref<NotifyInst >()
    const dialogRef = ref<DialogInst>()
    const statusBarHeight = ref(0)
    const menuButtonBounding = ref<MenuButtonBoundingClientRect>()
    const customBarHeight = computed(
      () => !menuButtonBounding.value
        ? 0
        : menuButtonBounding.value.bottom + menuButtonBounding.value.top - statusBarHeight.value)

    return {
      language,
      darkMode,
      statusBarHeight,
      menuButtonBounding,
      customBarHeight,
      loading,
      toastRef,
      notifyRef,
      dialogRef,
      isLogin,
    }
  },
  {
    persist: {
      key: '__app__',
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
