<script setup lang='ts'>
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  colors?: { value: string, size: number }[]
  customClass?: string
  customStyle?: CSSProperties
}>(), {
  colors: () => [
    { value: '#f43f5e', size: 0 },
    { value: '#8b5cf6', size: 0 },
    { value: '#0ea5e9', size: 0 },
    { value: '#10b981', size: 100 },
  ],
})
</script>

<template>
  <div class="relative wh-full overflow-hidden" :class="props.customClass ?? ''">
    <div class="background absolute" />
    <slot />
  </div>
</template>

<style scoped lang='less'>
.background {
  width: 150%;
  height: 150%;
  filter: blur(50px);
  animation: animate-1 20s linear infinite;
  background: radial-gradient(50% 50% at 50% 50%, rgba(255, 189, 46, 0.1) 0, rgba(255, 189, 46, 0) 100%);
}
@keyframes animate-1 {
  0% {
    transform: translate3d(-25%, -25%, 0);
  }
  25% {
    transform: translate3d(0, 25%, 0);
  }
  50% {
    transform: translate3d(60%, 25%, 0);
  }
  75% {
    transform: translate3d(60%, -25%, 0);
  }
  100% {
    transform: translate3d(-25%, -25%, 0);
  }
}
</style>
