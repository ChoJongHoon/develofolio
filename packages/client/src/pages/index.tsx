import React from 'react'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { MeDocument } from '~/graphql/document.generated'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'
import Link from 'next/link'
import { ROUTE_EDIT, ROUTE_LOGIN } from '~/routes'

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
					<Link href={ROUTE_EDIT}>Edit</Link>
				</>
			) : (
				<Link href={ROUTE_LOGIN}>로그인페이지로 이동</Link>
			)}
		</div>
	)
}

export default Home
