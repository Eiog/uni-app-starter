import type { MiddlewareRuntime } from '../../plugin/vite-plugin-uni-middleware-runtime'

export default ((to, from) => {
  // eslint-disable-next-line no-console
  console.log('global', to, from)
}) as MiddlewareRuntime
