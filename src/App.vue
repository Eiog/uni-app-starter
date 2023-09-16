<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'

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

<style lang="scss">
@import 'nutui-uniapp/styles/index';
</style>

<style>
/* #ifdef H5 */
body::-webkit-scrollbar,
div::-webkit-scrollbar,
*::-webkit-scrollbar {
  display: none;
}
body.pages-index-index uni-page-body,
body {
  padding-bottom: 0 !important;
}
/* #endif */
page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
