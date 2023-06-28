import { createSSRApp } from 'vue'
import App from './App.vue'
import './Interceptor'
import { useModules } from '~/modules'

export function createApp() {
  const app = createSSRApp(App)
  useModules(app)
  return {
    app,
  }
}
