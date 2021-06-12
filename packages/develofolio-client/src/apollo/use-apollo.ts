import { NormalizedCacheObject } from '@apollo/client'
import { useMemo } from 'react'
import { setAccessToken } from '~/lib/utils/access-token'
import { initApolloClient } from './client'

export const useApollo = (
	initialState?: NormalizedCacheObject,
	accessToken?: string
) => {
	if (accessToken) {
		setAccessToken(accessToken)
	}
	const store = useMemo(() => initApolloClient(initialState, accessToken), [
		accessToken,
		initialState,
	])
	return store
}
