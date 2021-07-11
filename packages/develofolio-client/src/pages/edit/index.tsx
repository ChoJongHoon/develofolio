import { NextPage } from 'next'
import { PageEditor } from '~/modules/editor/page-editor'
import { EditorSidebar } from '~/modules/editor/editor-sidebar'
import { MyPageDocument, PagePartsFragment } from '~/graphql/document.generated'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'
import { useStyletron } from 'styletron-react'
import { ROUTE_EDIT_NEW } from '~/routes'

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
	const [css] = useStyletron()
	return (
		<div
			className={css({
				display: 'flex',
				minHeight: '100vh',
			})}
		>
			<EditorSidebar />
			<PageEditor
				className={css({ flex: '1 1 0' })}
				initialContent={page.content}
			/>
		</div>
	)
}

export default Edit
