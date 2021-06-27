import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client'
import { typePolicies } from './type-policies'
import generatedIntrospection from '~/graphql/apollo-fragment-matcher.generated.json'
import { errorLink } from './links/error.link'
import { isServer } from '~/utils/is-server'
import { httpLink } from './links/http.link'
import { createAuthLink } from './links/auth.link'

function createApolloClient(
	initialState: NormalizedCacheObject = {},
	serverAccessToken?: string
) {
	return new ApolloClient({
		ssrMode: typeof window === 'undefined', // set to true for SSR
		link: ApolloLink.from([
			createAuthLink(serverAccessToken),
			errorLink,
			httpLink,
		]),
		cache: new InMemoryCache({
			typePolicies,
			possibleTypes: generatedIntrospection.possibleTypes,
		}).restore(initialState),
	})
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

export function initApolloClient(
	initState?: NormalizedCacheObject,
	serverAccessToken?: string
) {
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (isServer()) {
		return createApolloClient(initState, serverAccessToken)
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		// setAccessToken(cookie.parse(document.cookie).test);
		apolloClient = createApolloClient(initState)
	}

	return apolloClient
}
