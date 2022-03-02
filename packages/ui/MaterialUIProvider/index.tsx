import { ThemeProvider } from '@mui/material'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { ReactNode } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Theme from '../theme'
import { useTranslation } from 'react-i18next'
import { getLocale, Language } from '../i18n/locale'

export type MaterialUIProviderProps = {
  children: ReactNode
}

const MaterialUIProvider = ({ children }: MaterialUIProviderProps) => {
  const { i18n } = useTranslation()
  return (
    <ThemeProvider theme={Theme}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        locale={getLocale(i18n.language as Language)}
      >
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MaterialUIProvider
