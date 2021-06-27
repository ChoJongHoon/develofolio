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
import { ParsedUrlQuery } from 'querystring'

type ServerCallback<P, Q extends ParsedUrlQuery> = (
	client: ApolloClient<NormalizedCacheObject>
) => GetServerSideProps<P, Q>

export const withAuth =
	<
		P extends Record<string, any> = Record<string, any>,
		Q extends ParsedUrlQuery = ParsedUrlQuery
	>(
		callback: ServerCallback<P, Q> = () => async () => ({ props: {} } as any)
	) =>
	async (
		context: GetServerSidePropsContext<Q>
	): Promise<GetServerSidePropsResult<P>> => {
		const { req, res } = context

		const cookies = cookie.parse(req?.headers.cookie || '')

		let accessToken: string = cookies['accessToken']
		const refreshToken = cookies['refreshToken']
		let isLogged = Boolean(
			accessToken &&
				jwtDecode<{ exp: number }>(accessToken).exp * 1000 > Date.now()
		)

		if (!isLogged && refreshToken) {
			const refreshResponse = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/refresh`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						cookie: 'refresh_token=' + cookies.refresh_token,
					},
				}
			)

			/**
			 * https://github.com/node-fetch/node-fetch/issues/251#issuecomment-428143940
			 * headers.get('set-cookie') 로 가져오게 되면 배열이 합쳐져서 문자열로 나온다.
			 */
			const setCookies = (refreshResponse.headers as any).raw()['set-cookie']
			setCookies && res?.setHeader('set-cookie', setCookies)

			accessToken = (await refreshResponse.json()).accessToken

			if (!accessToken) {
				isLogged = false
				const logoutResponse = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/logout`,
					{
						method: 'GET',
						credentials: 'include',
						headers: {
							cookie: 'refresh_token=' + cookies.refresh_token,
						},
					}
				)
				const setCookies = (logoutResponse.headers as any).raw()['set-cookie']
				setCookies && res?.setHeader('set-cookie', setCookies)
			} else {
				isLogged = true
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
