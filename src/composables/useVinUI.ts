import type { ActionSheetProps, menuItems } from '@vingogo/uni-ui/lib/types/components/action-sheet/common'
import type { DialogProps } from '@vingogo/uni-ui/lib/types/components/dialog/common'
import type { NotifyProps } from '@vingogo/uni-ui/lib/types/components/notify/common'
import type { ToastProps } from '@vingogo/uni-ui/lib/types/components/toast/common'
import { Locale } from '@vingogo/uni-ui'
import enUS from '@vingogo/uni-ui/lib/locale/en-US'
import zhCN from '@vingogo/uni-ui/lib/locale/zh-CN'
import { useLanguage } from '~/modules'

type IActionSheetProps = Partial<Omit<ActionSheetProps, 'menuItems'>> & { menuItems: (Partial<Omit <menuItems, 'name'>> & { name: string })[] }
const { theme, toggle, isDark } = useTheme()
const { locale } = useLanguage()
watch(locale, (v) => {
  Locale.use(v as 'zh-CN' | 'en-US', v === 'zh-CN' ? zhCN : enUS)
})
const loading = ref(false)
function toggleLoading(value?: boolean) {
  if (value)
    loading.value = value
  else
    loading.value = !loading.value
}
const toastProps = ref<Partial<ToastProps>>({})
const toastEv: {
  closed?: () => void
} = {}
const notifyProps = ref<Partial<NotifyProps>>({})
const notifyEv: {
  click?: () => void
  closed?: () => void
} = {}
const dialogProps = ref<Partial<DialogProps>>({})
const dialogEv: {
  ok?: () => void
  cancel?: () => void
  closed?: () => void
} = {}
const actionSheetProps = ref<IActionSheetProps>({
  visible: false,
  menuItems: [],
})
const actionSheetEv: {
  choose?: (value: { item: menuItems, index: number }) => void
  cancel?: () => void
  close?: () => void
} = {}
export function useVinUI() {
  const toast = {
    show(options: string | Partial<Omit<ToastProps, 'visible'>>) {
      if (typeof options === 'string') {
        toastProps.value = {
          msg: options,
          type: 'text',
          visible: true,
        }
      }
      else {
        toastProps.value = { ...options, visible: true }
      }
    },
    text(msg: string, options?: Partial<Omit<ToastProps, 'visible' | 'type'>>) {
      toastProps.value = {
        ...options,
        msg,
        type: 'text',
        visible: true,
      }
    },
    success(msg: string, options?: Partial<Omit<ToastProps, 'visible' | 'type'>>) {
      toastProps.value = {
        ...options,
        msg,
        type: 'success',
        visible: true,
      }
    },
    fail(msg: string, options?: Partial<Omit<ToastProps, 'visible' | 'type'>>) {
      toastProps.value = {
        ...options,
        msg,
        type: 'fail',
        visible: true,
      }
    },
    warn(msg: string, options?: Partial<Omit<ToastProps, 'visible' | 'type'>>) {
      toastProps.value = {
        ...options,
        msg,
        type: 'warn',
        visible: true,
      }
    },
    loading(msg: string, options?: Partial<Omit<ToastProps, 'visible' | 'type'>>) {
      toastProps.value = {
        ...options,
        msg,
        type: 'loading',
        visible: true,
      }
    },
    hide() {
      toastProps.value = {
        visible: false,
      }
    },
  }
  const onToast = {
    onClosed(cb: () => void) {
      toastEv.closed = cb
    },
  }
  const notify = {
    show(options: string | Partial<Omit<NotifyProps, 'visible'>>) {
      if (typeof options === 'string') {
        notifyProps.value = {
          message: options,
          visible: true,
        }
      }
      else {
        notifyProps.value = { ...options, visible: true }
      }
    },
    close() {
      notifyProps.value = {
        visible: false,
      }
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
    show(options: Partial <Omit<DialogProps, 'visible'>>) {
      dialogProps.value = {
        ...options,
        visible: true,
      }
    },
    close() {
      dialogProps.value = {
        visible: false,
      }
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
  }
  const actionSheet = {
    show(options: IActionSheetProps) {
      actionSheetProps.value = {
        ...options,
        visible: true,
      }
    },
    close() {
      actionSheetProps.value = {
        menuItems: [],
        visible: false,
      }
    },
  }
  const onActionSheet = {
    onChoose(cb: (value: { item: IActionSheetProps['menuItems'][0], index: number }) => void) {
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
    toastProps,
    toastEv,
    toast,
    onToast,
    notifyProps,
    notifyEv,
    notify,
    onNotify,
    dialogProps,
    dialogEv,
    dialog,
    onDialog,
    actionSheetProps,
    actionSheetEv,
    actionSheet,
    onActionSheet,
  }
}
