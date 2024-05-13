<!-- eslint-disable no-console -->
<script setup lang="ts">
import LEchart from '~uni/lime-echart_0.8.7/components/l-echart/l-echart.vue'
import type { ECOption } from '~/composables/useEcharts'

console.log(getCurrentPages())

const { toast } = useNutUI()
const { darkMode } = useTheme()
const options = ref<ECOption>({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '5%',
    left: 'center',
  },
  title: {
    text: ``,
    left: 'center',
  },
  series: [
    {
      name: ``,
      type: 'pie',
      top: 'center',
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
          fontSize: 30,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 100, name: 'AAA' },
        { value: 200, name: 'BBB' },
        { value: 300, name: 'CCC' },
      ],
    },
  ],
})
const { domRef } = useEcharts(options, darkMode, (e) => {
  e.on('click', ({ data }: any) => {
    console.log(data)

    toast.text(data.name)
  })
})
const size = ref({
  width: 375,
  height: 400,
})
function changeSize() {
  size.value.width = 200
  size.value.height = 200
  domRef.value?.resize()
}
function changeData() {
  options.value = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    title: {
      text: ``,
      left: 'center',
    },
    series: [
      {
        name: ``,
        type: 'pie',
        top: 'center',
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
            fontSize: 30,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data: [
          { value: 100, name: 'AAA' },
          { value: 200, name: 'BBB' },
          { value: 300, name: 'CCC' },
          { value: 300, name: 'DDD' },
          { value: 300, name: 'EEE' },
        ],
      },
    ],
  }
}
</script>

<template>
  <div class="h-[100vh] w-full flex-col items-center dark:bg-black">
    <div :style="{ width: `${size.width}px`, height: `${size.height}px` }">
      <LEchart ref="domRef" />
    </div>
    <div class="flex-col">
      <uni-tag text="标签" />
      <button @click="changeSize">
        ChangeSize
      </button>
      <button @click="changeData">
        ChangeData
      </button>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>

<route lang="yaml">
  layout: false
  style:
    navigationStyle: "custom"
</route>
