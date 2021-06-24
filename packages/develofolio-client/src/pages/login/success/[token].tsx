import { useRouter } from 'next/dist/client/router'
import { useEffect } from 'react'
import { setAccessToken } from '~/lib/utils/access-token'

export default function Success() {
	const router = useRouter()
	const { token } = router.query

	useEffect(() => {
		if (token) {
			setAccessToken(token.toString())
			router.replace('/')
		}
	}, [router, token])

	return <></>
}
