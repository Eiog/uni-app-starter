<script setup lang='ts'>
withDefaults(defineProps<{ prefix?: string, name: string, color?: string, width?: number, height?: number }>(), {
  prefix: 'icon',
  width: 40,
  height: 40,
})
</script>

<template>
  <image
    :src="`/static/${prefix}-${name}.svg`"
    mode="aspectFit"
    :style="{ width: `${width}px`, height: `${height}px` }"
  />
</template>

<style scoped lang='less'>

</style>
