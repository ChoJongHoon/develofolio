import React from 'react'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { MeDocument } from '~/graphql/typed-document-nodes.generated'
import { genereateImagePath } from '~/utils/generate-image-path'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'

export const getServerSideProps = withAuthSsr()

const Home = () => {
	const { data } = useQuery(MeDocument)

	return (
		<div>
			{data?.me ? (
				<>
					{data.me.avatar && (
						<Image
							src={genereateImagePath(
								`${data.me.id}/profile/${data.me.avatar}`
							)}
							layout="fill"
							alt={data.me.name}
						/>
					)}
					<span>{data.me.name}</span>
				</>
			) : (
				<a href={`${process.env.NEXT_PUBLIC_SERVER}/auth/github`}>
					깃허브로 로그인
				</a>
			)}
		</div>
	)
}

export default Home
