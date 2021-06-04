import { useQuery } from '@apollo/client'
import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { useMemo } from 'react'
import { Icon, IconType } from '~/components/base/icon'
import { useModal } from '~/components/base/modal/use-modal'
import { GetSocialLinksDocument } from '~/graphql/typed-document-nodes.generated'
import { EditSocialLinksModal } from './edit-social-links-modal'

const ICON_TYPE_MAP: { [key in string]: IconType } = {
	github: 'Github',
	stackOverflow: 'StackOverflow',
	facebook: 'Facebook',
	twitter: 'Twitter',
}

export const SocialLinks = () => {
	const [isOpen, onOpen, onClose] = useModal()

	const { data } = useQuery(GetSocialLinksDocument)

	const socialLinks = data?.me.socialLinks

	const placeholder = useMemo(
		() => (
			<>
				{Object.values(ICON_TYPE_MAP).map((icon) => (
					<div key={icon} css={[circle, transparently]}>
						<Icon type={icon} color={OpenColor.teal[6]} size={20} />
					</div>
				))}
			</>
		),
		[]
	)

	return (
		<>
			<div css={wrapper()} onClick={onOpen}>
				{socialLinks && socialLinks.length > 0
					? socialLinks.map((socialLink) => {
							return (
								<div key={socialLink.name} css={circle}>
									<Icon
										type={ICON_TYPE_MAP[socialLink.name]}
										color={OpenColor.teal[6]}
										size={20}
									/>
								</div>
							)
					  })
					: placeholder}
				<div css={mask}>
					<Icon type="Pencil" color={OpenColor.gray[1]} size={24} />
				</div>
			</div>
			<EditSocialLinksModal open={isOpen} onClose={onClose} />
		</>
	)
}

const wrapper = () => css`
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	position: relative;
	cursor: pointer;
	&:hover {
		.css-${mask.name} {
			opacity: 1;
		}
	}
`

const circle = css`
	border: none;
	display: flex;
	width: 32px;
	height: 32px;
	background-color: #ffffff;
	border-radius: 50%;
	justify-content: center;
	align-items: center;
`

const transparently = css`
	opacity: 0.5;
`

const mask = css`
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	background-color: rgba(0, 0, 0, 0.3);
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	opacity: 0;
	transition: opacity 0.2s;
`
