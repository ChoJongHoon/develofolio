import React, { useCallback, useState } from 'react'
import { NextPage } from 'next'
import { useMutation } from '@apollo/client'
import { CreatePageDocument } from '~/graphql/typed-document-nodes.generated'
import { Descendant } from 'slate'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/dist/client/router'
import { withAuth } from '~/lib/hofs/with-auth'
import { ROUTE_EDIT } from '~/lib/utils/routes'

const getInitialContent = (): Descendant[] => [
	{
		key: nanoid(),
		type: 'banner',
		children: [
			{ key: nanoid(), type: 'banner-name', children: [{ text: '' }] },
			{ key: nanoid(), type: 'banner-tagline', children: [{ text: '' }] },
			{ key: nanoid(), type: 'banner-bio', children: [{ text: '' }] },
		],
	},
	{ key: nanoid(), type: 'paragraph', children: [{ text: '' }] },
]

export const getServerSideProps = withAuth()

const New: NextPage = () => {
	const router = useRouter()
	const [createPage] = useMutation(CreatePageDocument, {
		onCompleted: () => {
			router.push(ROUTE_EDIT)
		},
	})
	const [slug, setSlug] = useState('')

	const onCreateClick = useCallback(async () => {
		await createPage({
			variables: {
				slug,
				initialContent: getInitialContent(),
			},
		})
	}, [createPage, slug])

	return (
		<div>
			<span>slug</span>
			<input value={slug} onChange={(event) => setSlug(event.target.value)} />
			<button onClick={onCreateClick}>Create</button>
		</div>
	)
}

export default New
