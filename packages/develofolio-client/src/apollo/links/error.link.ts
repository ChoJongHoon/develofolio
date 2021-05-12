import { onError } from '@apollo/client/link/error'

export const errorLink = onError(({ graphQLErrors, forward, operation }) => {
	// console.log(`graphQLErrors`, graphQLErrors)
	// if (graphQLErrors) {
	// 	for (const err of graphQLErrors) {
	// 		console.log(`err?.extensions?.code`, err?.extensions?.code)
	// 		switch (err?.extensions?.code) {
	// 			case TokenErrorCode.ACCESS_TOKEN_EXPIRED:
	// 				let forward$
	// 				if (!isRefreshing) {
	// 					isRefreshing = true
	// 					forward$ = fromPromise(
	// 						refresh()
	// 							.then(() => {
	// 								resolvePendingRequests()
	// 								return
	// 							})
	// 							.catch(() => {
	// 								logout().then(() => {
	// 									// evictUserCache()
	// 								})
	// 								pendingRequests = []
	// 								return
	// 							})
	// 							.finally(() => {
	// 								isRefreshing = false
	// 							})
	// 					)
	// 				} else {
	// 					forward$ = fromPromise(
	// 						new Promise<void>((resolve) => {
	// 							pendingRequests.push(() => resolve())
	// 						})
	// 					)
	// 				}
	// 				return forward$.flatMap(() => forward(operation))
	// 			case TokenErrorCode.JWT_EXPIRED:
	// 				logout().then(() => {
	// 					// evictUserCache()
	// 				})
	// 				break
	// 			default:
	// 				return forward(operation)
	// 		}
	// 	}
	// }
})
