<script setup lang='ts'>
const { toggle, toggleLoading, toast, notify, onNotify, message, actionSheet, onActionSheet } = useWdUI()
onNotify.onClosed(() => {
  toast?.show('WdUi Notify closed')
})

onActionSheet.onSelect(({ item }) => {
  toast?.show(item.name)
})
function actions(ev: 'theme' | 'loading' | 'toast' | 'notify' | 'dialog' | 'actionSheet') {
  switch (ev) {
    case 'theme':
      toggle()
      break
    case 'loading':
      toggleLoading()
      setTimeout(() => {
        toggleLoading()
      }, 3000)
      break
    case 'toast':
      toast?.show('WdUi Toast')
      break
    case 'notify':
      notify?.showNotify('WdUi Notify')
      break
    case 'dialog':
      message?.show({ msg: 'WdUi Dialog Content' })
      break
    case 'actionSheet':
      actionSheet.show({
        title: 'WdUi ActionSheet',
        actions: [
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
    <h1>WdUi Demo</h1>
    <div class="flex flex-wrap items-center justify-center gap-[10px]">
      <WdButton type="info" size="small" @click="actions('theme')">
        toggle
      </WdButton>
      <WdButton type="info" size="small" @click="actions('loading')">
        ToggleLoading
      </WdButton>
      <WdButton type="info" size="small" @click="actions('toast')">
        Toast
      </WdButton>
      <WdButton type="info" size="small" @click="actions('notify')">
        Notify
      </WdButton>
      <WdButton type="info" size="small" @click="actions('dialog')">
        Dialog
      </WdButton>
      <WdButton type="info" size="small" @click="actions('actionSheet')">
        ActionSheet
      </WdButton>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
