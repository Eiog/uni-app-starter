<script setup lang="ts">
const { darkMode } = useTheme()
</script>

<template>
  <div :class="darkMode ? 'dark' : 'light'">
    <NutUiProvider>
      <WdUiProvider>
        <VinUiProvider>
          <div class="flex-col">
            <div class="flex gap-[10px] p-[10px]">
              <BackToHome class="m-r-auto" />
              <ToggleLanguage />
              <ToggleDarkMode />
            </div>
            <slot />
          </div>
        </VinUiProvider>
      </WdUiProvider>
    </NutUiProvider>
  </div>
</template>

<style scoped lang="less"></style>
