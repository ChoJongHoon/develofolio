import { HttpLink } from '@apollo/client'

export const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
	credentials: 'include',
	fetch,
})
