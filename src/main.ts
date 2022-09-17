import { createSSRApp } from 'vue';
import store from './stores';
import i18n from './i18n';
import App from './App.vue';
import 'uno.css';

import './Interceptor';
export function createApp() {
  const app = createSSRApp(App);
  app.use(store).use(i18n);
  return {
    app,
  };
}
