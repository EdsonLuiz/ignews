import {Provider as NextAuthProvider} from 'next-auth/client'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import '../styles/global.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}
export default MyApp
