<script setup lang='ts'>
import type { ECElementEvent } from 'echarts'
import type { ECOption } from '~/hooks/useEcharts'

const props = defineProps<{
  title?: string
  data?: { id?: number, value: number, name: string }[]
  options?: ECOption
}>()
const emit = defineEmits<{
  (e: 'click', v: ECElementEvent): void
}>()
const { useDarkMode } = storeToRefs(useAppStore())
const options = computed<ECOption>(() => {
  return {
    ...{
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: 0,
        left: 'center',
      },
      title: {
        text: `${props.title ?? ''}`,
        left: 'center',
        bottom: 0,
      },
      series: [
        {
          name: `${props.title ?? ''}`,
          type: 'pie',
          top: 200,
          radius: ['20%', '80%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}:{c}元\n{d}%',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: true,
          },
          data: props.data ?? [],
        },
      ],
    },
    ...props.options,

  }
})
const { domRef } = useEcharts(options, useDarkMode, (e) => {
  e.on('click', (v) => {
    emit('click', v as any)
  })
})
</script>

<template>
  <div ref="domRef" class="wh-full" />
</template>

<style scoped lang='less'>

</style>
