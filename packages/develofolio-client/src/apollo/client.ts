import {
	ApolloClient,
	ApolloLink,
	InMemoryCache,
	NormalizedCacheObject,
} from '@apollo/client'
import { typePolicies } from './type-policies'
import generatedIntrospection from '~/graphql/apollo-fragment-matcher.generated.json'
import { errorLink } from './links/error.link'
import { setContext } from '@apollo/client/link/context'
import { isServer } from '~/lib/utils/is-server'
import { getAccessToken } from '~/lib/utils/access-token'
import { refreshLink } from './links/refresh.link'
import { httpLink } from './links/http.link'

function createApolloClient(
	initialState: NormalizedCacheObject = {},
	serverAccessToken?: string
) {
	const authLink = setContext((_request, { headers }) => {
		const token = isServer() ? serverAccessToken : getAccessToken()

		return {
			headers: {
				...headers,
				Authorization: token ? `bearer ${token}` : '',
			},
		}
	})

	return new ApolloClient({
		ssrMode: typeof window === 'undefined', // set to true for SSR
		link: ApolloLink.from([refreshLink, authLink, errorLink, httpLink]),
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
