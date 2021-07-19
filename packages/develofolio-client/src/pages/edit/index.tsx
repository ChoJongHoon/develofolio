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
				minHeight: '100vh',
			})}
		>
			<div
				className={css({
					position: 'fixed',
					top: '0px',
					left: '0px',
					bottom: '0px',
					width: '72px',
				})}
			>
				<EditorSidebar />
			</div>
			<div
				className={css({
					marginLeft: '72px',
					width: 'calc(100% - 72px)',
				})}
			>
				<PageEditor
					className={css({ flex: '1 1 0' })}
					initialContent={page.content}
				/>
			</div>
		</div>
	)
}

export default Edit
