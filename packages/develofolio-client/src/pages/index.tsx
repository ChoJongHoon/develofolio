import { useQuery } from '@apollo/client'
import React from 'react'
import IconPicker from 'src/components/IconPicker'
import { MeDocument } from 'src/graphql/typed-document-nodes.generated'

export default function Home() {
	const { data } = useQuery(MeDocument)

	return (
		<div>
			<IconPicker />
			<a href="http://localhost:4000/auth/github">깃허브로 로그인</a>
			{data?.me.id}
		</div>
	)
}
