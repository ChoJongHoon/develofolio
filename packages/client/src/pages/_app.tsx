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
	)
}

export default App
