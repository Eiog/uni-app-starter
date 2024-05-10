<script setup lang='ts'>
const { darkMode, toggleTheme } = useTheme()
</script>

<template>
  <i
    class="cursor-pointer text-xl transition-colors dark:text-white/50 hover:text-black/80 dark:hover:text-white/80"
    :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
    @click="() => toggleTheme()"
  />
</template>

<style scoped lang='less'>

</style>
