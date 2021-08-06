import { HttpLink } from '@apollo/client'

export const httpLink = new HttpLink({
	uri: `${process.env.NEXT_PUBLIC_SERVER_HOST}/graphql`,
	credentials: 'include',
	fetch,
})
