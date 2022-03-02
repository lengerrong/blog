import i18n from 'i18next'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    ns: [],
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    react: {
      useSuspense: false
    }
  })
  .catch((error: unknown) => {
    console.error(error)
  })

export default i18n
