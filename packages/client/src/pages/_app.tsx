import React from 'react'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, NormalizedCache } from '@apollo/client'
import { globalStyle } from '~/styles/global-styles'
import { wrapper } from '~/redux/store'
import { useApollo } from '~/apollo/use-apollo'
import { INIT_STATE, SERVER_ACCESS_TOKEN } from '~/apollo/constants'
import { LightTheme, BaseProvider } from 'baseui'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '~/styles/styletron'
import { NextPage } from 'next'

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
			{globalStyle}
			<ApolloProvider client={client}>
				<StyletronProvider value={styletron}>
					<BaseProvider theme={LightTheme}>
						{getLayout(<Component {...pageProps} />)}
					</BaseProvider>
				</StyletronProvider>
			</ApolloProvider>
		</>
	)
}

export default wrapper.withRedux(App)
