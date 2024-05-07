<script setup lang='ts'>
const { toggleTheme, toggleLoading, toast, notify, onNotify, dialog, onDialog, actionSheet, onActionSheet } = useNutUI()
onNotify.onClosed(() => {
  toast.text('NutUi Notify closed')
})
onDialog.onClosed(() => {
  toast.text('NutUi Dialog closed')
})
onActionSheet.onChoose((item) => {
  toast.text(item.name)
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
      toast.text('NutUi Toast')
      break
    case 'notify':
      notify.show('NutUi Notify')
      break
    case 'dialog':
      dialog.show({ content: 'NutUi Dialog Content' })
      break
    case 'actionSheet':
      actionSheet.show({
        title: 'NutUi ActionSheet',
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
    <h1>NutUi Demo</h1>
    <div class="flex flex-wrap items-center justify-center gap-[10px]">
      <nut-button size="small" @click="actions('theme')">
        ToggleTheme
      </nut-button>
      <nut-button size="small" @click="actions('loading')">
        ToggleLoading
      </nut-button>
      <nut-button size="small" @click="actions('toast')">
        Toast
      </nut-button>
      <nut-button size="small" @click="actions('notify')">
        Notify
      </nut-button>
      <nut-button size="small" @click="actions('dialog')">
        Dialog
      </nut-button>
      <nut-button size="small" @click="actions('actionSheet')">
        ActionSheet
      </nut-button>
    </div>
  </div>
</template>

<style scoped lang='less'>

</style>
