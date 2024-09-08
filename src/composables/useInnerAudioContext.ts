/* eslint-disable unicorn/consistent-function-scoping */
interface Options {
  src?: string
  startTime?: number
  autoplay?: boolean
  loop?: boolean
  obeyMuteSwitch?: boolean
  volume?: number
  playbackRate?: number

}
function secondsToMinutesSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${(minutes < 10 ? '0' : '') + minutes}:${(remainingSeconds < 10 ? '0' : '') + remainingSeconds}`
}
export function useInnerAudioContext(options?: Options) {
  const { src, startTime = 0, autoplay = false, loop = false, obeyMuteSwitch = true, volume = 1, playbackRate = 1 } = options || {}
  const innerAudioContext = uni.createInnerAudioContext()
  if (src)
    innerAudioContext.src = src
  innerAudioContext.startTime = startTime
  innerAudioContext.autoplay = autoplay
  innerAudioContext.loop = loop
  innerAudioContext.obeyMuteSwitch = obeyMuteSwitch
  innerAudioContext.volume = volume
  innerAudioContext.playbackRate = playbackRate
  const currentTime = ref(0)
  const duration = ref(0)
  const running = ref(false)
  const paused = ref(false)
  const ended = ref(false)
  function initDuration() {
    if (Number.isNaN(innerAudioContext.duration) || innerAudioContext.duration === 0) {
      innerAudioContext.volume = 0
      innerAudioContext.play()
      setTimeout(() => {
        innerAudioContext.stop()
        innerAudioContext.volume = volume
        initDuration()
      }, 100)
    }
    else {
      duration.value = innerAudioContext.duration
    }
  }
  function onCanplay() {
    initDuration()
  }
  function onPlay() {
    duration.value = innerAudioContext.duration
    running.value = true
    paused.value = false
    ended.value = false
  }
  function onPause() {
    running.value = false
    paused.value = true
    ended.value = false
  }
  function onStop() {
    currentTime.value = 0
    running.value = false
    paused.value = true
    ended.value = false
  }
  function onEnded() {
    running.value = false
    paused.value = false
    ended.value = true
  }
  function onTimeUpdate() {
    currentTime.value = innerAudioContext.currentTime
  }
  function onError(error: any) {
    console.error(error)
  }
  function onWaiting() {

  }
  function onSeeking() {

  }
  function onSeeked() {

  }
  innerAudioContext.onCanplay(onCanplay)
  innerAudioContext.onPlay(onPlay)
  innerAudioContext.onPause(onPause)
  innerAudioContext.onStop(onStop)
  innerAudioContext.onEnded(onEnded)
  innerAudioContext.onTimeUpdate(onTimeUpdate)
  innerAudioContext.onError(onError)
  innerAudioContext.onWaiting(onWaiting)
  innerAudioContext.onSeeking(onSeeking)
  innerAudioContext.onSeeked(onSeeked)
  onUnmounted(() => {
    innerAudioContext.offCanplay(onCanplay)
    innerAudioContext.offPlay(onPlay)
    innerAudioContext.offPause(onPause)
    innerAudioContext.offStop(onStop)
    innerAudioContext.offEnded(onEnded)
    innerAudioContext.offTimeUpdate(onTimeUpdate)
    innerAudioContext.offError(onError)
    innerAudioContext.offWaiting(onWaiting)
    innerAudioContext.offSeeking(onSeeking)
    innerAudioContext.offSeeked(onSeeked)
    innerAudioContext.destroy()
  })
  return {
    innerAudioContext,
    currentTime,
    duration,
    running,
    paused,
    ended,
    secondsToMinutesSeconds,
  }
}
