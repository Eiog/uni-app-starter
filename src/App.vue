<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

const { toggleTheme, statusBarHeight, menuButtonBounding } = useTheme()
onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('App Launch')
  // #ifdef MP-WEIXIN || MP-QQ
  const systemInfo = uni.getSystemInfoSync()
  // the systemInfo.theme is only support dark mode in WeChat and QQ
  toggleTheme(systemInfo?.theme)
  statusBarHeight.value = systemInfo!.statusBarHeight || 44
  menuButtonBounding.value = uni.getMenuButtonBoundingClientRect()
  uni.onThemeChange((res: UniApp.OnThemeChangeCallbackResult) => toggleTheme(res?.theme))
  // #endif
  // #ifdef H5
  const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  toggleTheme(colorScheme.matches ? 'dark' : 'light')
  colorScheme.addEventListener('change', (e: MediaQueryListEvent) => toggleTheme(e.matches ? 'dark' : 'light'))
  // The data is obtained from iPhone13 miniprogram but statusBarHeight, top and bottom values are subtracted from the statusBarHeight value
  statusBarHeight.value = 0
  menuButtonBounding.value = { width: 87, height: 32, left: 281, top: 4, right: 368, bottom: 36 }
  // #endif
})
onShow(() => {
  // eslint-disable-next-line no-console
  console.log('App Show')
})
onHide(() => {
  // eslint-disable-next-line no-console
  console.log('App Hide')
})
</script>
