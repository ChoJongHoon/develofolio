import { useQuery } from '@apollo/client'
import React from 'react'
import { MeDocument } from '~/graphql/typed-document-nodes.generated'
import { withAuth } from '~/lib/hofs/with-auth'
import { genereateImagePath } from '~/lib/utils/generate-image-path'

export const getServerSideProps = withAuth()

const Home = () => {
	const { data } = useQuery(MeDocument)

	return (
		<div>
			{data?.me ? (
				<>
					{data.me.avatar && (
						<img
							src={genereateImagePath(
								`${data.me.id}/profile/${data.me.avatar}`
							)}
						/>
					)}
					<span>{data.me.name}</span>
				</>
			) : (
				<a href={`${process.env.SERVER}/auth/github`}>깃허브로 로그인</a>
			)}
		</div>
	)
}

export default Home
