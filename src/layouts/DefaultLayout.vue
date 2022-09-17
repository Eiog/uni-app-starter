<script setup lang="ts"></script>
<template>
  <div wfull hfull flex-center bg="white dark:gray-900">
    <div max-w-xl hfull flex-center select-none flex="col">
      <slot />
      <default-menu />
    </div>
  </div>
</template>
<style scoped lang="less"></style>
