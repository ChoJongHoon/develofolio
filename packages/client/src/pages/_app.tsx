import React from 'react'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, NormalizedCache } from '@apollo/client'
import { useApollo } from '~/apollo/use-apollo'
import { INIT_STATE, SERVER_ACCESS_TOKEN } from '~/apollo/constants'
import { LightTheme, BaseProvider } from 'baseui'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '~/styles/styletron'
import { NextPage } from 'next'
import { RecoilRoot } from 'recoil'
import '~/styles/global-styles.css'
import { SnackbarProvider } from 'baseui/snackbar'
import Script from 'next/script'
import Head from 'next/head'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'
import 'nprogress/nprogress.css'

const TopProgressBar = dynamic(
	async () => (await import('~/components/top-progress-bar')).TopProgressBar,
	{ ssr: false }
)

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger)
}

type MyAppProps = AppProps & {
	apolloClient: ApolloClient<NormalizedCache>
	Component: NextPage
}

const App = ({ Component, pageProps }: MyAppProps) => {
	const client = useApollo(
		pageProps[INIT_STATE],
		pageProps[SERVER_ACCESS_TOKEN]
	)

	const getLayout = Component.getLayout || ((page) => page)

	return (
		<>
			<Head>
				<title>DeveloFolio - 개발자들의 포트폴리오 에디터</title>
				<meta property="fb:app_id" content="1005620286882831" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/favicons/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicons/favicon-16x16.png"
				/>
				<link rel="manifest" href="/favicons/site.webmanifest" />
				<link
					rel="mask-icon"
					href="/favicons/safari-pinned-tab.svg"
					color="#ffffff"
				/>
				<link rel="shortcut icon" href="/favicons/favicon.ico" />
				<meta name="msapplication-TileColor" content="#ffffff" />
				<meta
					name="msapplication-config"
					content="/favicons/browserconfig.xml"
				/>
				<meta name="theme-color" content="#ffffff" />
			</Head>
			{process.env.NEXT_PUBLIC_GA_TRACKING_ID && (
				<>
					<Script
						strategy="afterInteractive"
						src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
					/>
					<Script strategy="afterInteractive">
						{`window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');`}
					</Script>
				</>
			)}
			<TopProgressBar />
			<ApolloProvider client={client}>
				<RecoilRoot>
					<StyletronProvider value={styletron}>
						<BaseProvider theme={LightTheme}>
							<SnackbarProvider>
								{getLayout(<Component {...pageProps} />)}
							</SnackbarProvider>
						</BaseProvider>
					</StyletronProvider>
				</RecoilRoot>
			</ApolloProvider>
		</>
	)
}

export default App
