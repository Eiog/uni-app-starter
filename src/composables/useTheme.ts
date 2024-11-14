export interface MenuButtonBoundingClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}
const colorModeOptions = [
  {
    label: '自动',
    value: 'auto',
  },
  {
    label: '浅色',
    value: 'light',
  },
  {
    label: '深色',
    value: 'dark',
  },
]
const colorMode = ref<'light' | 'dark' | 'auto'>(uni.getStorageSync('color-mode') || 'auto')

const isDark = computed(() => colorMode.value === 'dark')
const systemColorMode = ref<'light' | 'dark'>('light')
watch(colorMode, (v) => {
  uni.setStorageSync('color-mode', v)
})
const theme = computed(() => colorMode.value === 'auto' ? systemColorMode.value : colorMode.value)

function setColorMode(value: 'light' | 'dark' | 'auto') {
  colorMode.value = value
}
function toggle() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
const statusBarHeight = ref(44)
const menuButtonBounding = ref<MenuButtonBoundingClientRect>({ width: 87, height: 32, left: 281, top: 4, right: 368, bottom: 36 })
// #ifdef MP-WEIXIN
menuButtonBounding.value = uni.getMenuButtonBoundingClientRect()
systemColorMode.value = uni.getAppBaseInfo().theme as any ?? 'light'
uni.onThemeChange((res: UniApp.OnThemeChangeCallbackResult) => {
  systemColorMode.value = res.theme
})
statusBarHeight.value = uni.getWindowInfo().statusBarHeight
// #endif

// #ifdef H5
window.matchMedia('(prefers - color - scheme: dark)').addEventListener('change', (e) => {
  systemColorMode.value = e.matches ? 'dark' : 'light'
})
// #endif
const customBarHeight = computed(() => menuButtonBounding.value.bottom + menuButtonBounding.value.top - statusBarHeight.value)

const useCustomBar = ref(false)
export function useTheme() {
  return {
    colorModeOptions,
    colorMode,
    isDark,
    theme,
    systemColorMode,
    setColorMode,
    toggle,
    statusBarHeight,
    menuButtonBounding,
    customBarHeight,
    useCustomBar,
  }
}
