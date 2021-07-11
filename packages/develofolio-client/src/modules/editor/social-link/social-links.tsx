import { useQuery } from '@apollo/client'
import OpenColor from 'open-color'
import { transitions } from 'polished'
import React, { useMemo } from 'react'
import { StyleObject, useStyletron } from 'styletron-react'
import { Icon, IconType } from '~/components/icon'
import { useModal } from '~/components/modal/use-modal'
import {
	MyPageSocialLinksDocument,
	SocialLinkType,
} from '~/graphql/document.generated'
import { useHover } from '~/hooks/use-hover'
import { EditSocialLinksModal } from './edit-social-links-modal'

const ICON_TYPE_MAP: { [key in SocialLinkType]: IconType } = {
	[SocialLinkType.Github]: 'Github',
	[SocialLinkType.StackOverflow]: 'StackOverflow',
	[SocialLinkType.Facebook]: 'Facebook',
	[SocialLinkType.Twitter]: 'Twitter',
}

export const SocialLinks = () => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()
	const [isOpen, onOpen, onClose] = useModal()

	const { data } = useQuery(MyPageSocialLinksDocument)

	const socialLinks = data?.page?.socialLinks

	const placeholder = useMemo(
		() => (
			<>
				{Object.values(ICON_TYPE_MAP).map((icon) => (
					<div
						key={icon}
						className={css({
							...circle,
							opacity: 0.5,
						})}
					>
						<Icon type={icon} color={OpenColor.teal[6]} size={20} />
					</div>
				))}
			</>
		),
		[]
	)

	return (
		<>
			<div
				className={css({
					display: 'flex',
					flexWrap: 'wrap',
					gap: '16px',
					position: 'relative',
					cursor: 'pointer',
				})}
				ref={hoverRef}
				onClick={onOpen}
			>
				{socialLinks && socialLinks.length > 0
					? socialLinks.map((socialLink) => {
							return (
								<div key={socialLink.type} className={css(circle)}>
									<Icon
										type={ICON_TYPE_MAP[socialLink.type]}
										color={OpenColor.teal[6]}
										size={20}
									/>
								</div>
							)
					  })
					: placeholder}
				<div
					className={css({
						position: 'absolute',
						top: '0px',
						left: '0px',
						right: '0px',
						bottom: '0px',
						backgroundColor: 'rgba(0, 0, 0, 0.3)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '4px',
						opacity: isHovered ? 1 : 0,
						...transitions(['opacity'], '0.2s'),
					})}
				>
					<Icon type="Pencil" color={OpenColor.gray[1]} size={24} />
				</div>
			</div>
			<EditSocialLinksModal open={isOpen} onClose={onClose} />
		</>
	)
}

const circle: StyleObject = {
	border: 'none',
	display: 'flex',
	width: '32px',
	height: '32px',
	backgroundColor: OpenColor.white,
	borderRadius: '50%',
	justifyContent: 'center',
	alignItems: 'center',
}
