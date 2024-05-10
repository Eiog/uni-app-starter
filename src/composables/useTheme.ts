export interface MenuButtonBoundingClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}
const theme = ref<'light' | 'dark'>('light')
const darkMode = computed(() => theme.value === 'dark')
function toggleTheme(value?: string | 'light' | 'dark') {
  if (value === 'light' || value === 'dark')
    theme.value = value

  else
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
const statusBarHeight = ref(44)
const menuButtonBounding = ref<MenuButtonBoundingClientRect>({ width: 87, height: 32, left: 281, top: 4, right: 368, bottom: 36 })
const customBarHeight = computed(
  () => !menuButtonBounding.value
    ? 0
    : menuButtonBounding.value.bottom + menuButtonBounding.value.top - statusBarHeight.value,
)
const useCustomBar = ref(false)
export function useTheme() {
  return {
    theme,
    darkMode,
    toggleTheme,
    statusBarHeight,
    menuButtonBounding,
    customBarHeight,
    useCustomBar,
  }
}
