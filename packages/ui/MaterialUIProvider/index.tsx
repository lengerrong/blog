import { ThemeProvider } from '@mui/material'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import enLocale from 'date-fns/locale/en-US'
import { ReactNode } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Theme from '../theme'

export type MaterialUIProviderProps = {
  children: ReactNode
}

const MaterialUIProvider = ({ children }: MaterialUIProviderProps) => {
  return (
    <ThemeProvider theme={Theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default MaterialUIProvider
