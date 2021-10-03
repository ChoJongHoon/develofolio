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
import { Descendant } from 'slate'

interface EditProps {
	initialContent: Descendant[]
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
		let initialContent = user.page.content
		if (!initialContent) {
			const { data } = await client.mutate({
				mutation: UpdateContentDocument,
				variables: {
					content: generateInitialContent(),
				},
			})
			initialContent = data?.page.content
		}

		return {
			props: {
				initialContent,
			},
		}
	}
)

const EditPage: NextPage<EditProps> = ({ initialContent }) => {
	return <PageEditor initialContent={initialContent} />
}

EditPage.getLayout = (page) => <EditorLayout>{page}</EditorLayout>

export default EditPage
