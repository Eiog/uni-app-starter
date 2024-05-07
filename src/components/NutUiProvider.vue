<script setup lang='ts'>
const { theme, loading, toastRef, notifyRef, notifyEv, dialogRef, dialogEv, actionSheetProps, actionSheetEv } = useNutUI()
</script>

<template>
  <nut-config-provider :theme="theme">
    <nut-loading-page :loading="loading" />
    <nut-toast ref="toastRef" />
    <nut-notify ref="notifyRef" @click="notifyEv.click" @closed="notifyEv.closed" />
    <nut-dialog ref="dialogRef" @ok="dialogEv.ok" @cancel="dialogEv.cancel" @closed="dialogEv.closed" @opened="dialogEv.opened" />
    <nut-action-sheet v-bind="actionSheetProps" v-model:visible="actionSheetProps.visible" @choose="actionSheetEv.choose" @cancel="actionSheetEv.cancel" @close="actionSheetEv.close" />
    <slot />
  </nut-config-provider>
</template>

<style scoped lang='less'>

</style>
