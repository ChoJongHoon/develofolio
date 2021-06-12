import { setContext } from '@apollo/client/link/context'
import { getAccessToken } from '~/lib/utils/access-token'
import { isServer } from '~/lib/utils/is-server'

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
