import type { ActionSheetOption, ActionsheetProps, DialogInst, DialogOptions, NotifyInst, NotifyOptions, ToastInst, ToastOptions } from 'nutui-uniapp'
import { EnUSLang, Locale, ZhCNLang } from 'nutui-uniapp/locale'

type ActionSheetProps = Partial<ActionsheetProps>
const { theme, toggle, isDark } = useTheme()
const { locale } = useLanguage()
watch(locale, (v) => {
  Locale.use(v as 'zh-CN' | 'en-US', v === 'zh-CN' ? ZhCNLang() : EnUSLang())
})
const loading = ref(false)
function toggleLoading(value?: boolean) {
  if (value)
    loading.value = value
  else
    loading.value = !loading.value
}
const toastRef = ref<ToastInst>()
const notifyRef = ref<NotifyInst>()
const notifyEv: {
  click?: () => void
  closed?: () => void
} = {}
const dialogRef = ref<DialogInst>()
const dialogEv: {
  ok?: () => void
  cancel?: () => void
  closed?: () => void
  opened?: () => void
} = {}
const actionSheetProps = ref({
  visible: false,
})
const actionSheetEv: {
  choose?: (item: ActionSheetOption, index: number) => void
  cancel?: () => void
  close?: () => void
} = {}
export function useNutUI() {
  const toast = {
    text(msg: string, options?: ToastOptions) {
      toastRef.value?.text(msg, options)
    },
    success(msg: string, options?: ToastOptions) {
      toastRef.value?.success(msg, options)
    },
    warning(msg: string, options?: ToastOptions) {
      toastRef.value?.warning(msg, options)
    },
    error(msg: string, options?: ToastOptions) {
      toastRef.value?.error(msg, options)
    },
    loading(msg: string, options?: ToastOptions) {
      toastRef.value?.loading(msg, options)
    },
    hide() {
      toastRef.value?.hide()
    },
  }
  const notify = {
    show(msg: string, options?: NotifyOptions) {
      notifyRef.value?.showNotify({ msg, ...options })
    },
    hide() {
      notifyRef.value?.hideNotify()
    },
  }
  const onNotify = {
    onClick(cb: () => void) {
      notifyEv.click = cb
    },
    onClosed(cb: () => void) {
      notifyEv.closed = cb
    },
  }
  const dialog = {
    show(options: DialogOptions) {
      dialogRef.value?.showDialog(options)
    },
    ok() {
      dialogRef.value?.onOk()
    },
    cancel() {
      dialogRef.value?.onCancel()
    },
  }
  const onDialog = {
    onOk(cb: () => void) {
      dialogEv.ok = cb
    },
    onCancel(cb: () => void) {
      dialogEv.cancel = cb
    },
    onClosed(cb: () => void) {
      dialogEv.closed = cb
    },
    onOpened(cb: () => void) {
      dialogEv.opened = cb
    },
  }
  const actionSheet = {
    show(options: ActionSheetProps) {
      actionSheetProps.value = { ...options, visible: true }
    },
    close() {
      actionSheetProps.value = {
        visible: false,
      }
    },
  }
  const onActionSheet = {
    onChoose(cb: (item: ActionSheetOption, index: number) => void) {
      actionSheetEv.choose = cb
    },
    onCancel(cb: () => void) {
      actionSheetEv.cancel = cb
    },
    onClose(cb: () => void) {
      actionSheetEv.close = cb
    },
  }
  return {
    theme,
    toggle,
    isDark,
    loading,
    toggleLoading,
    toastRef,
    toast,
    notifyRef,
    notifyEv,
    notify,
    onNotify,
    dialogRef,
    dialogEv,
    dialog,
    onDialog,
    actionSheetProps,
    actionSheetEv,
    actionSheet,
    onActionSheet,
  }
}
