const loading = ref(false)
function toggleLoading(value?: boolean) {
  if (value)
    loading.value = value
  else
    loading.value = !loading.value
}
export function useLoading() {
  return {
    loading,
    toggleLoading,
  }
}
