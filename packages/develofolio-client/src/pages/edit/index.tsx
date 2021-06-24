import { NextPage } from 'next'
import { PageEditor } from '~/components/editor/page-editor'
import { EditorHeader } from '~/components/editor/editor-header'
import {
	MyPageDocument,
	PagePartsFragment,
} from '~/graphql/typed-document-nodes.generated'
import { withAuth } from '~/lib/hofs/with-auth'
import { ROUTE_EDIT_NEW } from '~/lib/utils/routes'

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
