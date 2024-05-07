<!-- eslint-disable no-console -->
<script setup lang='ts'>
const { toggleTheme, toggleLoading, toast, onToast, notify, onNotify, dialog, onDialog, actionSheet, onActionSheet } = useVinUI()
onToast.onClosed(() => {
  console.log('VinUi Toast Closed')
})
onNotify.onClosed(() => {
  toast.show('VinUi Notify closed')
})
onDialog.onClosed(() => {
  toast.show('VinUi Dialog Closed')
})
onActionSheet.onChoose(({ item }) => {
  toast?.show(item.name)
})
function actions(ev: 'theme' | 'loading' | 'toast' | 'notify' | 'dialog' | 'actionSheet') {
  switch (ev) {
    case 'theme':
      toggleTheme()
      break
    case 'loading':
      toggleLoading()
      setTimeout(() => {
        toggleLoading()
      }, 3000)
      break
    case 'toast':
      toast?.show('VinUi Toast')
      break
    case 'notify':
      notify?.show('VinUi Notify')
      break
    case 'dialog':
      dialog?.show({ content: 'VinUi Dialog Content' })
      break
    case 'actionSheet':
      actionSheet.show({
        title: 'VinUi ActionSheet',
        menuItems: [
          { name: 'ActionItem-1' },
          { name: 'ActionItem-2' },
          { name: 'ActionItem-3' },
        ],
      })
      break

    default:
      break
  }
}
</script>

<template>
  <div class="flex-col-center gap-[10px]">
    <h1>VinUi Demo</h1>
    <div class="flex flex-wrap items-center justify-center gap-[10px]">
      <VinButton type="info" size="small" @click="actions('theme')">
        ToggleTheme
      </VinButton>
      <VinButton type="info" size="small" @click="actions('loading')">
        ToggleLoading
      </VinButton>
      <VinButton type="info" size="small" @click="actions('toast')">
        Toast
      </VinButton>
      <VinButton type="info" size="small" @click="actions('notify')">
        Notify
      </VinButton>
      <VinButton type="info" size="small" @click="actions('dialog')">
        Dialog
      </VinButton>
      <VinButton type="info" size="small" @click="actions('actionSheet')">
        ActionSheet
      </VinButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
