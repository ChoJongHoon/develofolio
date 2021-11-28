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
import { useEffect, useRef } from 'react'
import { storage } from '~/utils/storage'
import { useMutation } from '@apollo/client'
import { useRecoilValue } from 'recoil'
import { saveState } from '~/modules/editor/editor.atoms'

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
	const savedState = useRecoilValue(saveState)
	const savedRef = useRef<typeof savedState>(savedState)

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

	useEffect(
		function storeRef() {
			savedRef.current = savedState
		},
		[savedState]
	)

	useEffect(function preventEdit() {
		const handleBeforeunload = (event: BeforeUnloadEvent) => {
			if (savedRef.current !== 'SAVED') {
				event.preventDefault()
				event.returnValue = ''

				return ''
			}
			return undefined
		}
		window.addEventListener('beforeunload', handleBeforeunload)

		return () => window.removeEventListener('beforeunload', handleBeforeunload)
	}, [])

	return <PageEditor initialContent={initialContent} />
}

EditPage.getLayout = (page) => <EditorLayout>{page}</EditorLayout>

export default EditPage
