import { useQuery } from '@apollo/client'
import { MeDocument } from '~/graphql/document.generated'

export const useUser = () => {
	const { data } = useQuery(MeDocument)
	return data?.me
}
