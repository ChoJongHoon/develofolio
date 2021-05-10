import { InMemoryCache } from '@apollo/client'
import { typePolicies } from './type-policies'

export const cache = new InMemoryCache({
	typePolicies,
})
