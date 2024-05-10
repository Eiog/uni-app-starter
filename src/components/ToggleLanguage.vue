<script setup lang='ts'>
const { toggleLanguage } = useLanguage()
</script>

<template>
  <i
    class="i-ri-translate cursor-pointer text-xl transition-colors dark:text-white/50 hover:text-black/80 dark:hover:text-white/80"
    @click="() => toggleLanguage()"
  />
</template>

<style scoped lang='less'>

</style>
