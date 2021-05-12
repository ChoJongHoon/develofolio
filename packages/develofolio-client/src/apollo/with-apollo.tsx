import React from 'react'
import { getAccessToken, setAccessToken } from '~/lib/utils/access-token'
import { isServer } from '~/lib/utils/is-server'
import { initApolloClient } from './client'
import cookie from 'cookie'
import Head from 'next/head'

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo(PageComponent: any, { ssr = true } = {}) {
	const WithApollo = ({
		apolloClient,
		serverAccessToken,
		apolloState,
		...pageProps
	}: any) => {
		if (!isServer() && !getAccessToken()) {
			setAccessToken(serverAccessToken)
		}
		const client = apolloClient || initApolloClient(apolloState)
		return <PageComponent {...pageProps} apolloClient={client} />
	}

	if (process.env.NODE_ENV !== 'production') {
		// Find correct display name
		const displayName =
			PageComponent.displayName || PageComponent.name || 'Component'

		// Warn if old way of installing apollo is used
		if (displayName === 'App') {
			console.warn('This withApollo HOC only works with PageComponents.')
		}

		// Set correct display name for devtools
		WithApollo.displayName = `withApollo(${displayName})`
	}

	if (ssr || PageComponent.getInitialProps) {
		WithApollo.getInitialProps = async (ctx: any) => {
			const {
				AppTree,
				ctx: { req, res },
			} = ctx

			let serverAccessToken = ''
			if (isServer()) {
				const cookies = cookie.parse(req?.headers.cookie || '')

				if (cookies.refreshToken) {
					const response = await fetch('http://localhost:4000/auth/refresh', {
						method: 'POST',
						credentials: 'include',
						headers: {
							cookie: 'refreshToken=' + cookies.refreshToken,
						},
					})

					/**
					 * https://github.com/node-fetch/node-fetch/issues/251#issuecomment-428143940
					 * headers.get('set-cookie') 로 가져오게 되면 배열이 합쳐져서 문자열로 나온다.
					 */
					const setCookies = (response.headers as any).raw()['set-cookie']
					setCookies && res?.setHeader('set-cookie', setCookies)

					const data = await response.json()

					serverAccessToken = data.accessToken
				}
			}

			// Run all GraphQL queries in the component tree
			// and extract the resulting data
			const apolloClient = (ctx.ctx.apolloClient = initApolloClient(
				{},
				serverAccessToken
			))

			const pageProps = PageComponent.getInitialProps
				? await PageComponent.getInitialProps(ctx)
				: {}

			// Only on the server
			if (typeof window === 'undefined') {
				// When redirecting, the response is finished.
				// No point in continuing to render
				if (res && res.finished) {
					return {}
				}

				if (ssr) {
					try {
						// Run all GraphQL queries
						const { getDataFromTree } = await import('@apollo/client/react/ssr')
						await getDataFromTree(
							<AppTree
								pageProps={{
									...pageProps,
									apolloClient,
								}}
								apolloClient={apolloClient}
							/>
						)
					} catch (error) {
						// Prevent Apollo Client GraphQL errors from crashing SSR.
						// Handle them in components via the data.error prop:
						// https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
						console.error('Error while running `getDataFromTree`', error)
					}
				}

				// getDataFromTree does not call componentWillUnmount
				// head side effect therefore need to be cleared manually
				Head.rewind()
			}

			// Extract query data from the Apollo store
			const apolloState = apolloClient.cache.extract()

			return {
				...pageProps,
				apolloState,
				serverAccessToken,
			}
		}
	}

	return WithApollo
}
