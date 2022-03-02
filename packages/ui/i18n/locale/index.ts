import enUS from 'date-fns/locale/en-US'
import zhCN from 'date-fns/locale/zh-CN'

export enum Language {
  English = 'en-US',
  Chinese = 'zh-CN'
}

export const getLocale = (lng: Language) => {
  switch (lng) {
    case Language.Chinese:
      return zhCN
    case Language.English:
    default:
      return enUS
  }
}

export default Locale
