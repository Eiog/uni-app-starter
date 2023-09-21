import { kebabCase } from '@uni-helper/vite-plugin-uni-components'

export function WotDesignResolver() {
  return (name: string) => {
    if (name.match(/^Wd[A-Z]/)) {
      const compName = kebabCase(name)
      return {
        name,
        from: `wot-design-uni/components/${compName}/${compName}.vue`,
      }
    }
  }
}
