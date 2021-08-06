import React from 'react'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { MeDocument } from '~/graphql/document.generated'
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
							src={data.me.avatar}
							width={32}
							height={32}
							alt={data.me.name}
						/>
					)}
					<span>{data.me.name}</span>
				</>
			) : (
				<a href={`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/github`}>
					깃허브로 로그인
				</a>
			)}
		</div>
	)
}

export default Home
