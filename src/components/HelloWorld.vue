<script setup lang='ts'>
const { t } = useI18n()
</script>

<template>
  <div class="flex-col-center gap-[10px] p-y-[20px]">
    <h1 class="text-4xl">
      {{ t('Hello') }}
    </h1>
    <p class="text-2xl">
      {{ t('Welcome') }}
    </p>
  </div>
</template>

<style scoped lang='less'>

</style>
