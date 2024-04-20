import { getCurrentInstance } from 'vue'

export function useUniEventChannel() {
  const $this = getCurrentInstance()!.proxy as any
  const eventChannel = $this.getOpenerEventChannel()
  return eventChannel as {
    emit: (event: string, data: any) => void
    on: (event: string, callback: (data: any) => void) => void
    once: (event: string, callback: (data: any) => void) => void
    off: (event: string, callback: (data: any) => void) => void
  }
}
