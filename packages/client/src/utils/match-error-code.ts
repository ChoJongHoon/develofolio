import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'

export const matchErrorCode = (
	error: ApolloError | readonly GraphQLError[] | undefined,
	code: string
): boolean => {
	let hasError = false
	const graphQLErrors =
		error instanceof ApolloError ? error.graphQLErrors : error

	if (graphQLErrors && graphQLErrors.length > 0) {
		for (const err of graphQLErrors) {
			const errOptions = err.extensions
			const errCode = errOptions?.code
			if (errCode === code) {
				hasError = true
			}
		}
	}

	return hasError
}
