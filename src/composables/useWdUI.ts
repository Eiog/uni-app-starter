import { Locale } from 'wot-design-uni'
import enUS from 'wot-design-uni/locale/lang/en-US'
import zhCN from 'wot-design-uni/locale/lang/zh-CN'
import type { useMessage, useNotify, useToast } from 'wot-design-uni'
import type { Action, ActionSheetProps } from 'wot-design-uni/components/wd-action-sheet/types'

type IActionSheetProps = Partial <Omit <ActionSheetProps, 'actions'>> & { actions?: Partial<Omit <Action, 'name'>> & { name: string }[] }
const { theme, toggleTheme, darkMode } = useTheme()
const { language } = useLanguage()
watch(language, (v) => {
  Locale.use(v === 'cn' ? 'zh-CN' : 'en-US', v === 'cn' ? zhCN : enUS)
})
const loading = ref(false)
function toggleLoading(value?: boolean) {
  if (value)
    loading.value = value
  else
    loading.value = !loading.value
}
let toast: ReturnType<typeof useToast> | undefined
let notify: ReturnType<typeof useNotify> | undefined
const notifyEv: {
  click?: () => void
  closed?: () => void
  opened?: () => void
} = {}
let message: ReturnType<typeof useMessage> | undefined
const actionSheetProps = ref<Partial<ActionSheetProps> & { modelValue: boolean }>({ modelValue: false })
const actionSheetEv: {
  select?: ((value: { item: Action, rowIndex: number, colIndex?: number }) => void)
  open?: () => void
  opened?: () => void
  close?: () => void
  closed?: () => void
  clickModal?: () => void
  cancel?: () => void
} = {}
export function useWdUI() {
  function setup(items: {
    toast?: typeof toast
    notify?: typeof notify
    message?: typeof message
  }) {
    toast = items.toast
    notify = items.notify
    message = items.message
  }
  const onNotify = {
    onClick(cb: () => void) {
      notifyEv.click = cb
    },
    onClosed(cb: () => void) {
      notifyEv.closed = cb
    },
    onOpened(cb: () => void) {
      notifyEv.opened = cb
    },
  }
  const actionSheet = {
    show(options: IActionSheetProps) {
      actionSheetProps.value = {
        ...options,
        modelValue: true,
      } as any
    },
    close() {
      actionSheetProps.value = {
        modelValue: false,
      }
    },
  }
  const onActionSheet = {
    onSelect(cb: (value: { item: Action, rowIndex: number, colIndex?: number }) => void) {
      actionSheetEv.select = cb
    },
    onOpen(cb: () => void) {
      actionSheetEv.open = cb
    },
    onOpened(cb: () => void) {
      actionSheetEv.opened = cb
    },
    onClose(cb: () => void) {
      actionSheetEv.close = cb
    },
    onClosed(cb: () => void) {
      actionSheetEv.closed = cb
    },
    onClickModal(cb: () => void) {
      actionSheetEv.clickModal = cb
    },
    onCancel(cb: () => void) {
      actionSheetEv.cancel = cb
    },

  }
  return {
    theme,
    toggleTheme,
    darkMode,
    loading,
    toggleLoading,
    setup,
    toast,
    notify,
    notifyEv,
    onNotify,
    message,
    actionSheet,
    actionSheetProps,
    actionSheetEv,
    onActionSheet,
  }
}
