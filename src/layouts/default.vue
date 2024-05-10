<script setup lang="ts">
const { darkMode, useCustomBar, customBarHeight } = useTheme()
</script>

<template>
  <div :class="darkMode ? 'dark' : 'light'">
    <!-- <NutUiProvider> -->
    <!-- <WdUiProvider> -->
    <!-- <VinUiProvider> -->
    <div class="flex-col">
      <div v-if="useCustomBar" :style="{ height: `${customBarHeight}px` }" class="w-full bg-black/20" />
      <div class="flex gap-[10px] p-[10px] dark:bg-black">
        <BackToHome class="m-r-auto" />
        <ToggleLanguage />
        <ToggleDarkMode />
      </div>
      <slot />
    </div>
    <!-- </VinUiProvider> -->
    <!-- </WdUiProvider> -->
    <!-- </NutUiProvider> -->
  </div>
</template>

<style scoped lang="less"></style>
