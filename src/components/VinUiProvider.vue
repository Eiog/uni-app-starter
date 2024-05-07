<script setup lang='ts'>
const { theme, loading, toastProps, toastEv, notifyProps, notifyEv, dialogProps, dialogEv, actionSheetProps, actionSheetEv } = useVinUI()
</script>

<template>
  <vin-config-provider :theme="theme">
    <vin-overlay v-model:visible="loading">
      <div class="wh-full flex items-center justify-center">
        <div class="flex-col-center gap-[10px]">
          <vin-icon name="loading" :size="26" custom-class="text-white" />
          <span class="text-white">正在加载</span>
        </div>
      </div>
    </vin-overlay>
    <vin-toast v-bind="toastProps" v-model:visible="toastProps.visible" @closed="toastEv.closed" />
    <vin-notify v-bind="notifyProps" v-model:visible="notifyProps.visible" @click="notifyEv.click" @closed="notifyEv.closed" />
    <vin-dialog v-bind="dialogProps" v-model:visible="dialogProps.visible" @ok="dialogEv.ok" @cancel="dialogEv.cancel" @closed="dialogEv.closed" />
    <vin-action-sheet
      v-bind="actionSheetProps"
      v-model:visible="actionSheetProps.visible"
      @choose="(item:any, index:any) => actionSheetEv.choose && actionSheetEv.choose({ item, index })"
      @cancel="actionSheetEv.cancel"
      @close="actionSheetEv.close"
    />
    <slot />
  </vin-config-provider>
</template>

<style scoped lang='less'>

</style>
