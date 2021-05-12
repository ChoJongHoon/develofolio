import { TokenRefreshLink } from 'apollo-link-token-refresh'
import jwtDecode from 'jwt-decode'
import { getAccessToken, setAccessToken } from '~/lib/utils/access-token'

export const refreshLink = new TokenRefreshLink({
	accessTokenField: 'accessToken',
	isTokenValidOrUndefined: () => {
		const token = getAccessToken()

		if (!token) {
			return true
		}

		try {
			const { exp } = jwtDecode<{ exp: number }>(token)
			if (Date.now() >= exp * 1000) {
				return false
			} else {
				return true
			}
		} catch {
			return false
		}
	},
	fetchAccessToken: () => {
		return fetch('http://localhost:4000/auth/refresh', {
			method: 'Post',
			credentials: 'include',
		})
	},
	handleFetch: (accessToken) => {
		setAccessToken(accessToken)
	},
	handleError: (err) => {
		console.warn('Your refresh token is invalid. Try to relogin')
		console.error(err)
	},
})
