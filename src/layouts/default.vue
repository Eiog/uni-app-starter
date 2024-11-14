<script setup lang="ts">
const { isDark, useCustomBar, customBarHeight } = useTheme()
</script>

<template>
  <div :class="isDark ? 'dark' : 'light'">
    <NutUiProvider>
      <WdUiProvider>
        <VinUiProvider>
          <div class="flex-col">
            <div v-if="useCustomBar" :style="{ height: `${customBarHeight}px` }" class="w-full bg-black/20" />
            <slot />
          </div>
        </VinUiProvider>
      </WdUiProvider>
    </NutUiProvider>
  </div>
</template>

<style scoped lang="less"></style>
