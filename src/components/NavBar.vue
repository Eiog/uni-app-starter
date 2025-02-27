<script setup lang='ts'>
import type { CSSProperties } from 'vue'

const props = withDefaults(defineProps<{
  show?: boolean
  backgroundColor?: string | 'transparent'
  textColor?: string
  title?: string
  back?: boolean
  customClass?: string
}>(), {
  show: true,
  backgroundColor: '#fff',
  textColor: '#000',
  back: false,
})
const { statusBarHeight, customBarHeight, menuButtonBounding, windowInfo } = useTheme()
const sidesWidth = computed(() => (windowInfo.value?.windowWidth ?? 0) - (menuButtonBounding.value?.left ?? 0))
const safeAreaTopStyle = computed(() => {
  return {
    height: `${statusBarHeight.value + customBarHeight.value}px`,
    paddingTop: `${statusBarHeight.value}px`,
  } as CSSProperties
})

function handleBack() {
  uni.navigateBack()
}
</script>

<template>
  <div :class="props.customClass" class="h-[44px] w-full flex" :style="{ visibility: props.show ? 'visible' : 'hidden', backgroundColor: `${props.backgroundColor}`, color: `${props.textColor}`, ...safeAreaTopStyle }">
    <div class="h-full" :style="{ width: `${sidesWidth}px` }">
      <slot name="left">
        <div v-if="props.back" class="h-full flex-y-center p-x-[10px]" @click="handleBack">
          <i class="i-ri-arrow-left-s-line text-[20px]" />
        </div>
      </slot>
    </div>
    <div class="h-full min-w-0 flex flex-1 items-center justify-center">
      <slot>
        {{ props.title }}
      </slot>
    </div>
    <div class="h-full" :style="{ width: `${sidesWidth}px` }">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
