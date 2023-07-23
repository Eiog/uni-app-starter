<script setup lang="ts">
const { darkMode, language } = storeToRefs(useAppStore())
function changeLanguage() {
  language.value = language.value === 'zh_cn' ? 'en_us' : 'zh_cn'
}
</script>

<template>
  <div mt4 flex items-center gap5>
    <i class="btn i-ri-home-2-line" />
    <i class="btn i-ri-translate" @click="changeLanguage" />
    <i
      class="btn"
      :class="darkMode ? 'i-ri-moon-fill' : 'i-ri-sun-fill'"
      @click="darkMode = !darkMode"
    />
    <i class="btn i-ri-user-heart-line" />
  </div>
</template>

<style scoped lang="less">
.btn {
  --apply: text-xl transition-colors cursor-pointer hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400;
}
</style>
