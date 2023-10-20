<script setup lang='ts'>
const { darkMode, loading, toastRef, notifyRef, dialogRef } = storeToRefs(useAppStore())
</script>

<template>
  <div :class="{ dark: darkMode }" class="min-h-100vh bg-aGray1 text-black">
    <nut-config-provider :theme="darkMode ? 'dark' : ''">
      <nut-loading-page :loading="loading" bg-color="rgba(255,255,255,.6)" />
      <nut-toast ref="toastRef" />
      <nut-notify ref="notifyRef" />
      <nut-dialog ref="dialogRef" />
      <slot />
    </nut-config-provider>
  </div>
</template>

<style scoped lang='less'>

</style>
