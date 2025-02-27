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

const systemColorMode = ref<'light' | 'dark'>('light')
watch(colorMode, (v) => {
  uni.setStorageSync('color-mode', v)
})
const theme = computed(() => colorMode.value === 'auto' ? systemColorMode.value : colorMode.value)
const isDark = computed(() => theme.value === 'dark')

function setColorMode(value: 'light' | 'dark' | 'auto') {
  colorMode.value = value
}
function toggle() {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
const statusBarHeight = ref(0)
const customBarHeight = ref(44)
const menuButtonBounding = ref<UniNamespace.GetMenuButtonBoundingClientRectRes>()
const windowInfo = ref<UniNamespace.GetWindowInfoResult>()
// #ifdef MP-WEIXIN
menuButtonBounding.value = uni.getMenuButtonBoundingClientRect()
statusBarHeight.value = uni.getWindowInfo().statusBarHeight
windowInfo.value = uni.getWindowInfo()
systemColorMode.value = uni.getAppBaseInfo().theme as any ?? 'light'
uni.onThemeChange((res: UniApp.OnThemeChangeCallbackResult) => {
  systemColorMode.value = res.theme
})

// #endif

// #ifdef H5
window.matchMedia('(prefers - color - scheme: dark)').addEventListener('change', (e) => {
  systemColorMode.value = e.matches ? 'dark' : 'light'
})
// #endif

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
    customBarHeight,
    menuButtonBounding,
    windowInfo,
  }
}
