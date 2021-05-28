import React from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client'
import { GetProfileDocument } from '~/graphql/typed-document-nodes.generated'
import { css } from '@emotion/react'

export const Profile = () => {
	const { data } = useQuery(GetProfileDocument)
	const me = data?.me
	const profile = me?.profile

	return (
		<div css={container}>
			{me && profile && (
				<Image
					src={`https://d9r22ehwkgf1q.cloudfront.net/images/${me.id}/profile/${profile}`}
					width={400}
					height={300}
					objectFit="cover"
				/>
			)}
		</div>
	)
}

const container = css``
