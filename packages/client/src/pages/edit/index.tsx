import { NextPage } from 'next'
import { PageEditor } from '~/modules/editor/page-editor'
import { MyPageDocument, PagePartsFragment } from '~/graphql/document.generated'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'
import { ROUTE_EDIT_NEW } from '~/routes'
import { EditorLayout } from '~/layouts/editor-layout'

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
	return <PageEditor initialContent={page.content} />
}

Edit.getLayout = (page) => <EditorLayout>{page}</EditorLayout>

export default Edit
