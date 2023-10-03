<script setup lang='ts'>
const { darkMode, loading, toastRef } = storeToRefs(useAppStore())
</script>

<template>
  <div :class="{ dark: darkMode }">
    <nut-loading-page :loading="loading" bg-color="rgba(255,255,255,.6)" />
    <nut-toast ref="toastRef" />
    <slot />
  </div>
</template>

<style scoped lang='less'>

</style>
