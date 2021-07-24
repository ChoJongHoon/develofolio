import { setContext } from '@apollo/client/link/context'
import { getAccessToken } from '~/utils/access-token'
import { isServer } from '~/utils/is-server'

export const createAuthLink = (serverAccessToken?: string) =>
	setContext((_request, { headers }) => {
		const accessToken = isServer() ? serverAccessToken : getAccessToken()

		return {
			headers: {
				...headers,
				authorization: accessToken ? `bearer ${accessToken}` : '',
			},
		}
	})
