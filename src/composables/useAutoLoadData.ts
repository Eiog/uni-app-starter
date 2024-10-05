import type { UseInfiniteData, UseInfiniteScrollOptions } from 'vue-hooks-plus/lib/useInfiniteScroll/types'
import { useInfiniteScroll } from 'vue-hooks-plus'

export function useAutoLoadData<T extends UseInfiniteData, K extends Record<string, any>>(
  service: (param: { page: number, limit: number } & Record<string, any>) => Promise<T>,
  param: K,
  options?: UseInfiniteScrollOptions<T> | undefined,
) {
  const _param = ref<K & { page: number, limit: number }>({
    page: 1,
    limit: 10,
    ...param,
  })
  const result = useInfiniteScroll<T>((data) => {
    _param.value.page = data ? Math.ceil(data.list.length / _param.value.limit) + 1 : 1
    return service(_param.value)
  }, options)
  const noMore = computed(() => result.data.value && (result.data?.value.list.length === result.data?.value.total))
  return {
    ...result,
    noMore,
    param: _param,
  }
}
