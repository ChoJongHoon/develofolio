import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { useCallback } from 'react'
import { ROUTE_HOME } from '~/routes'

export const useLogout = () => {
	const router = useRouter()

	const logout = useCallback(async () => {
		await axios.get('/jwt/logout', {
			baseURL: process.env.NEXT_PUBLIC_SERVER_HOST,
			withCredentials: true,
		})
		router.push(ROUTE_HOME)
	}, [router])

	return [logout] as const
}
