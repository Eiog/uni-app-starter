<script setup lang="ts">

</script>

<template>
  <div class="flex-col-center gap-[10px] p-[10px]">
    <NutUiDemo />
    <WdUiDemo />
    <VinUiDemo />
  </div>
</template>

<style scoped lang="less">

</style>

<route type="home" lang="json">
{
  "name":"index",
  "meta":{
    "requiredAuth":true
  },
  "style":{
    "navigationStyle": "custom"
  }
}
</route>
