import { NextPage } from 'next'
import { PageEditor } from '~/modules/editor/page-editor'
import { EditorHeader } from '~/modules/editor/editor-header'
import { MyPageDocument, PagePartsFragment } from '~/graphql/document.generated'
import { ROUTE_EDIT_NEW } from '~/utils/routes'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'

interface EditProps {
	page: PagePartsFragment
}

export const getServerSideProps = withAuthSsr<EditProps>(
	(client) => async () => {
		const {
			data: { page },
		} = await client.query({ query: MyPageDocument })

		if (!page) {
			return {
				redirect: {
					destination: ROUTE_EDIT_NEW,
					permanent: false,
				},
			}
		}

		return {
			props: {
				page,
			},
		}
	}
)

const Edit: NextPage<EditProps> = ({ page }) => {
	return (
		<div>
			<EditorHeader />
			<PageEditor initialContent={page.content} />
		</div>
	)
}

export default Edit
