import { createSSRApp } from "vue";
import store from "./store";
import App from "./App.vue";
import 'uno.css'
import './Interceptor'
import tmui from "./tmui"
export function createApp() {
  const app = createSSRApp(App);
  app.use(store)
  app.use(tmui)
  return {
    app,
  };
}
