import React from 'react'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, NormalizedCache } from '@apollo/client'
import { withApollo } from '~/apollo/with-apollo'
import { globalStyle } from '~/styles/global-styles'

type MyAppProps = AppProps & {
	apolloClient: ApolloClient<NormalizedCache>
}

function MyApp({ Component, pageProps, apolloClient }: MyAppProps) {
	return (
		<>
			{globalStyle}
			<ApolloProvider client={apolloClient}>
				<Component {...pageProps} />
			</ApolloProvider>
		</>
	)
}

export default withApollo(MyApp)
