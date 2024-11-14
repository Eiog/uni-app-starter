<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { pages } from 'virtual:uni-pages'

const { useCustomBar } = useTheme()
const route = useRoute()
watch(() => route.fullPath, (v) => {
  const route = pages.find(f => f.path === v?.slice(1))
  if (route && route.style && route.style.navigationStyle === 'custom')
    useCustomBar.value = true

  else
    useCustomBar.value = false
})

onLaunch(() => {
  // eslint-disable-next-line no-console
  console.log('App Launch')
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
