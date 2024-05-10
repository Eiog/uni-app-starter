import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import * as echarts from 'echarts/core'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import type {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
} from 'echarts/charts'
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components'
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
>

echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])
interface EChartsComponent {
  init: (charts: typeof echarts, theme?: string, opts?: object, onChart?: (chart: echarts.ECharts) => void) => Promise<echarts.ECharts>
  resize: (size?: { width: number, height: number }) => void
  canvasToTempFilePath: () => Promise<string>
}
/**
 * Echarts hooks函数
 * @param options - 图表配置
 * @param darkMode - 暗黑模式
 * @param renderFun - 图表函数(例如：图表监听函数)
 */
export default function useEcharts(
  options: Ref<ECOption> | ComputedRef<ECOption>,
  darkMode?: ComputedRef<boolean>,
  renderFun?: (chartInstance: echarts.ECharts) => void,
) {
  let chart: echarts.ECharts | null = null
  const domRef = ref<EChartsComponent | null>(null)
  function isRendered() {
    return Boolean(domRef.value && chart)
  }

  function update(updateOptions: ECOption) {
    if (isRendered())
      chart!.setOption({ ...updateOptions, backgroundColor: 'transparent' })
  }

  async function render() {
    if (domRef.value) {
      const theme = darkMode?.value ? 'dark' : 'light'
      await nextTick()
      // chart = echarts.init(domRef.value, theme)
      chart = await domRef.value.init(echarts, theme)
      if (renderFun)
        renderFun(chart)

      update(options.value)
    }
  }

  function destroy() {
    chart?.dispose()
  }

  function updateTheme() {
    destroy()
    render()
  }

  watch(options, (newValue) => {
    update(newValue)
  })

  watch(darkMode || computed(() => false), () => {
    updateTheme()
  })

  onMounted(() => {
    if (!isRendered())
      render()
  })
  onUnmounted(() => {
    destroy()
  })

  return {
    domRef,
  }
}
