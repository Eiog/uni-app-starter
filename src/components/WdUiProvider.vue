<script setup lang='ts'>
import { useMessage, useNotify, useToast } from 'wot-design-uni'

const { theme, loading, setup, notifyEv, actionSheetProps, actionSheetEv } = useWdUI()
setup({
  toast: useToast(),
  notify: useNotify(),
  message: useMessage(),
})
</script>

<template>
  <wd-config-provider :theme="theme">
    <wd-overlay :show="loading">
      <div class="wh-full flex items-center justify-center">
        <div class="flex-col-center gap-[10px]">
          <wd-loading />
          <span class="text-white">正在加载</span>
        </div>
      </div>
    </wd-overlay>
    <wd-toast />
    <wd-notify @click="notifyEv.click" @closed="notifyEv.closed" @opened="notifyEv.opened" />
    <wd-message-box />
    <wd-action-sheet
      v-bind="actionSheetProps"
      v-model="actionSheetProps.modelValue"
      @select="actionSheetEv.select"
      @open="actionSheetEv.open"
      @opened="actionSheetEv.opened"
      @close="actionSheetEv.close"
      @closed="actionSheetEv.closed"
      @click-modal="actionSheetEv.clickModal"
      @cancel="actionSheetEv.cancel"
    />
    <slot />
  </wd-config-provider>
</template>

<style scoped lang='less'>

</style>
