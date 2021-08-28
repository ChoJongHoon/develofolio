import { NextPage } from 'next'
import { PageEditor } from '~/modules/editor/page-editor'
import {
	PagePartsFragment,
	UpdateContentDocument,
} from '~/graphql/document.generated'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'
import { ROUTE_LOGIN } from '~/routes'
import { EditorLayout } from '~/layouts/editor-layout'
import { generateInitialContent } from '~/modules/editor/utils/generate-initial-content'

interface EditProps {
	page: PagePartsFragment
}

export const getServerSideProps = withAuthSsr<EditProps>(
	(client, user) => async () => {
		if (!user) {
			return {
				redirect: {
					destination: ROUTE_LOGIN,
					permanent: false,
				},
			}
		}

		if (!user.page.content) {
			await client.mutate({
				mutation: UpdateContentDocument,
				variables: {
					content: generateInitialContent(),
				},
			})
		}

		return {
			props: {
				page: user.page,
			},
		}
	}
)

const Edit: NextPage<EditProps> = ({ page }) => {
	return <PageEditor initialContent={page.content} />
}

Edit.getLayout = (page) => <EditorLayout>{page}</EditorLayout>

export default Edit
