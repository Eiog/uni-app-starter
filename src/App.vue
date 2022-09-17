<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
onLaunch(() => {
  console.log('App Launch');
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>
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
  height: 100%;
}
</style>
