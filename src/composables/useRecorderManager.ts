/* eslint-disable unicorn/consistent-function-scoping */
interface RecordResult {
  tempFilePath: string
  duration: number
  fileSize: number
}
type IRecorderManager = UniApp.RecorderManager & {
  onResume: (options: (result: any) => void) => void
  onInterruptionBegin: (options: (result: any) => void) => void
  onInterruptionEnd: (options: (result: any) => void) => void
}
export function useRecorderManager() {
  const recorderManager = uni.getRecorderManager() as IRecorderManager
  const running = ref(false)
  const ended = ref(false)
  const paused = ref(false)
  const duration = ref(0)
  const recordResult = ref<RecordResult>()
  let timer: NodeJS.Timeout | null = null
  function updateDuration() {
    if (timer)
      clearInterval(timer)
    timer = setInterval(() => {
      duration.value += 1
    }, 1000)
  }
  function clearDuration() {
    duration.value = 0
  }
  function stopDuration() {
    if (timer)
      clearInterval(timer)
  }
  function onStart() {
    running.value = true
    clearDuration()
    updateDuration()
  }
  function onPause() {
    running.value = false
    paused.value = true
    stopDuration()
  }
  function onResume() {
    running.value = true
    paused.value = false
    updateDuration()
  }
  function onStop(res: RecordResult) {
    running.value = false
    ended.value = true
    stopDuration()
    recordResult.value = res
  }
  function onInterruptionBegin() {

  }
  function onInterruptionEnd() {

  }
  function onFrameRecorded() {

  }
  function onError(error: any) {
    console.error(error)
  }
  recorderManager.onStart(onStart)
  recorderManager.onPause(onPause)
  recorderManager.onResume(onResume)
  recorderManager.onStop(onStop)
  recorderManager.onInterruptionBegin(onInterruptionBegin)
  recorderManager.onInterruptionEnd(onInterruptionEnd)
  recorderManager.onFrameRecorded(onFrameRecorded)
  recorderManager.onError(onError)

  onUnmounted(() => {
    recorderManager.stop()
  })
  return {
    recorderManager,
    running,
    paused,
    ended,
  }
}
