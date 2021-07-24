import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from 'next'
import cookie from 'cookie'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { initApolloClient } from '~/apollo/client'
import jwtDecode from 'jwt-decode'
import { INIT_STATE, SERVER_ACCESS_TOKEN } from '~/apollo/constants'
import { ROUTE_LOGIN } from '~/routes'
import { ParsedUrlQuery } from 'querystring'

type ServerCallback<P, Q extends ParsedUrlQuery> = (
	client: ApolloClient<NormalizedCacheObject>
) => GetServerSideProps<P, Q>

interface Options {
	required: boolean
}

export const withAuthSsr =
	<
		P extends Record<string, any> = Record<string, any>,
		Q extends ParsedUrlQuery = ParsedUrlQuery
	>(
		callback: ServerCallback<P, Q> = () => async () => ({ props: {} } as any),
		options?: Options
	) =>
	async (
		context: GetServerSidePropsContext<Q>
	): Promise<GetServerSidePropsResult<P>> => {
		const { req, res, resolvedUrl } = context

		const cookies = cookie.parse(req?.headers.cookie || '')

		let accessToken: string = cookies['access_token']

		let isLogged = Boolean(
			accessToken &&
				jwtDecode<{ exp: number }>(accessToken).exp * 1000 > Date.now()
		)

		if (accessToken && !isLogged) {
			return {
				redirect: {
					destination: `${process.env.NEXT_PUBLIC_SERVER}/jwt/refresh?redirect=${req.url}`,
					permanent: false,
				},
			}
		}

		if (options?.required === true && !isLogged) {
			return {
				redirect: {
					destination: `${ROUTE_LOGIN}/?callback=${resolvedUrl}`,
					permanent: false,
				},
			}
		}

		const client = initApolloClient({}, accessToken)
		const gssp = callback(client)
		const result = await gssp(context)

		if ('props' in result) {
			return {
				props: {
					...result.props,
					[INIT_STATE]: client.extract(),
					...(accessToken ? { [SERVER_ACCESS_TOKEN]: accessToken } : {}),
				},
			}
		}

		return result
	}
