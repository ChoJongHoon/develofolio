import { NextPage } from 'next'
import { PageEditor } from '~/modules/editor/page-editor'
import { EditorHeader } from '~/modules/editor/editor-header'
import {
	MyPageDocument,
	PagePartsFragment,
} from '~/graphql/typed-document-nodes.generated'
import { withAuth } from '~/utils/with-auth'
import { ROUTE_EDIT_NEW } from '~/utils/routes'

interface EditProps {
	page: PagePartsFragment
}

export const getServerSideProps = withAuth<EditProps>((client) => async () => {
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
})

const Edit: NextPage<EditProps> = ({ page }) => {
	return (
		<div>
			<EditorHeader />
			<PageEditor initialContent={page.content} />
		</div>
	)
}

export default Edit
