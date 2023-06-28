<script setup lang="ts"></script>

<template>
  <div wh-full flex-center bg="white dark:gray-900">
    <div hfull max-w-xl flex-col-center select-none>
      <slot />
      <default-menu />
    </div>
  </div>
</template>

<style scoped lang="less"></style>
