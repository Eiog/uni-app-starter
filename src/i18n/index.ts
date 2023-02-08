import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhHans from './zh-Hans.json'
type MessageSchema = typeof en
const i18n = createI18n<[MessageSchema], 'en' | 'zh-Hans'>({
  locale: 'en',
  messages: {
    en,
    'zh-Hans': zhHans,
  },
})
export default i18n
