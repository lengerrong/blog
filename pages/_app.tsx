import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MaterialUIProvider from 'ui/MaterialUIProvider'
import '../i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MaterialUIProvider>
      <Component {...pageProps} />
    </MaterialUIProvider>
  )
}

export default MyApp
