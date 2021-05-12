import { useRouter } from 'next/dist/client/router'
import {} from 'next/link'
import React, { useEffect } from 'react'
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
