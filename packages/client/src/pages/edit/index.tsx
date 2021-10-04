import { NextPage } from 'next'
import { PageEditor } from '~/modules/editor/page-editor'
import {
	UpdateContentDocument,
	UpdateSlugDocument,
} from '~/graphql/document.generated'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'
import { ROUTE_LOGIN } from '~/routes'
import { EditorLayout } from '~/layouts/editor-layout'
import { generateInitialContent } from '~/modules/editor/utils/generate-initial-content'
import { Descendant } from 'slate'
import { useEffect } from 'react'
import { storage } from '~/utils/storage'
import { useMutation } from '@apollo/client'

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
	const [updateSlug] = useMutation(UpdateSlugDocument, {
		errorPolicy: 'ignore',
	})
	useEffect(() => {
		const slug = storage.getItem('reservedSlug')
		if (slug) {
			updateSlug({
				variables: {
					slug,
				},
			})
		}
		storage.removeItem('reservedSlug')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return <PageEditor initialContent={initialContent} />
}

EditPage.getLayout = (page) => <EditorLayout>{page}</EditorLayout>

export default EditPage
