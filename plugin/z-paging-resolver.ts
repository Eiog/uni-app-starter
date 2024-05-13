export function ZPagingResolver() {
  return (name: string) => {
    if (name.match(/^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)/)) {
      const cName = name
        .toLowerCase()
      return {
        name,
        from: `z-paging/components/z-paging${cName}/z-paging${cName}.vue`,
      }
    }
  }
}
