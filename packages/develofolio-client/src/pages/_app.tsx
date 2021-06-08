import React, { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, NormalizedCache } from '@apollo/client'
import { globalStyle } from '~/styles/global-styles'
import { wrapper } from '~/redux/store'
import { initApolloClient } from '~/apollo/client'

type MyAppProps = AppProps & {
	apolloClient: ApolloClient<NormalizedCache>
}

function MyApp({ Component, pageProps }: MyAppProps) {
	const client = useMemo(() => initApolloClient(), [])

	return (
		<>
			{globalStyle}
			<ApolloProvider client={client}>
				<Component {...pageProps} />
			</ApolloProvider>
		</>
	)
}

export default wrapper.withRedux(MyApp)
