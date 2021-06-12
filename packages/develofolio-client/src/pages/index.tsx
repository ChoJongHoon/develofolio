import { useQuery } from '@apollo/client'
import React from 'react'
import { MeDocument } from '~/graphql/typed-document-nodes.generated'
import { withAuth } from '~/lib/hofs/with-auth'

export const getServerSideProps = withAuth()

export default function Home() {
	const { data } = useQuery(MeDocument)

	return (
		<div>
			{data?.me ? (
				data.me.name
			) : (
				<a href="http://localhost:4000/auth/github">깃허브로 로그인</a>
			)}
		</div>
	)
}
