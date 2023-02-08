import type { ComponentResolver } from 'unplugin-vue-components'

/**
 * Resolver for Naive UI
 *
 * @author @antfu
 * @link https://www.naiveui.com/
 */
export function UviewUiResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^(N[A-Z]|n-[a-z])/))
        return { name, from: `uview-plus/components/${name}}/${name}.vue` }
    },
  }
}
