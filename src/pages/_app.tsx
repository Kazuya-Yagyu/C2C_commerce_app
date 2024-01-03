import { AppProps } from 'next/app'
import Head from 'next/head'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'
import GlobalSpinner from 'components/organisms/globalSpinner'
import { AuthContextProvider } from 'contexts/authContext'
import GlobalSpinnerContextProvider from 'contexts/globalSpinnerContext'
import { ShoppingCartContextProvider } from 'contexts/shoppingCartContext'
import { theme } from 'themes'
import type { ApiContext } from 'types'
import { fetcher } from 'utils'

// グローバルのスタイル
const GlobalStyle = createGlobalStyle`
html,
body {
  background-color: rgba(0, 0, 128, 0.1);
},
textarea {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  cursor: pointer;
  text-decoration: none;
  transition: .25s;
  color: ${theme.colors.black};
}

ol, ul {
  list-style: none;
}
`

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
        {/* <title key="title">{SITE_TITLE}</title>
        <meta name="title" content={SITE_TITLE} key="meta:title" />
        <meta name="description" content={SITE_DESCRIPTION} key="meta:description" />
        <meta property="og:title" content={SITE_TITLE} key="meta:og:title" />
        <meta property="og:description" content={SITE_DESCRIPTION} key="meta:og:description" />
        <meta property="og:image" content={`${publicRuntimeConfig.domainUrl}/static/images/icon/icon-512.png`} key="meta:og:image" />
        <meta property="og:site_name" content={SITE_NAME} /> */}
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        {/* <meta property="fb:app_id" content="556485011968079" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@truck2hand" /> */}
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <SWRConfig
          value={{
            shouldRetryOnError: false,
            fetcher,
          }}
        >
          <GlobalSpinnerContextProvider>
            <ShoppingCartContextProvider>
              <AuthContextProvider context={context}>
                <GlobalSpinner />
                <Component {...pageProps} />
              </AuthContextProvider>
            </ShoppingCartContextProvider>
          </GlobalSpinnerContextProvider>
        </SWRConfig>
      </ThemeProvider>
    </>
  )
}

export default MyApp
