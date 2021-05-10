import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client'
import { cache } from './cache'

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_HOST,
	credentials: 'include',
	fetch,
})

export const client = new ApolloClient({
	link: ApolloLink.from([httpLink]),
	cache,
})
