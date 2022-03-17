import '../styles/globals.css'
import type { AppProps } from 'next/app'
import MaterialUIProvider from 'ui/MaterialUIProvider'
import i18n from 'ui/i18n'
import { I18nextProvider } from 'react-i18next'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <MaterialUIProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </MaterialUIProvider>
    </I18nextProvider>
  )
}

export default MyApp
