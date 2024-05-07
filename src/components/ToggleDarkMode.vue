<script setup lang='ts'>
const { darkMode, toggleTheme } = useTheme()
</script>

<template>
  <i
    class="cursor-pointer text-xl transition-colors dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
    :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
    @click="() => toggleTheme()"
  />
</template>

<style scoped lang='less'>

</style>
