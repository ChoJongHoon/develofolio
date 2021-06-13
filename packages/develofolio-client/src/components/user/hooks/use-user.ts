import { useQuery } from '@apollo/client'
import { MeDocument } from '~/graphql/typed-document-nodes.generated'

export const useUser = () => {
	const { data } = useQuery(MeDocument)
	return data?.me
}
