<script setup lang="ts">
const { isDark } = useTheme()
</script>

<template>
  <div :class="isDark ? 'dark' : 'light'">
    <NutUiProvider>
      <WdUiProvider>
        <slot />
      </WdUiProvider>
    </NutUiProvider>
  </div>
</template>

<style scoped lang="less"></style>
