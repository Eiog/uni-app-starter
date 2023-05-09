<script setup lang="ts"></script>

<template>
  <div wh-full flex-center bg="white dark:gray-900">
    <div max-w-xl hfull flex-col-center select-none>
      <slot />
      <default-menu />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
