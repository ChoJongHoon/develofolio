import OpenColor from 'open-color'
import { useStyletron } from 'styletron-react'
import { BannerElement, CustomRenderElementProps } from '../custom-types'
import { Profile } from '../profile/profile'
import { SocialLinks } from '../social-link/social-links'

export const Banner = ({
	attributes,
	children,
}: CustomRenderElementProps<BannerElement>) => {
	const [css] = useStyletron()
	return (
		<div
			className={css({
				backgroundColor: OpenColor.gray[0],
				marginLeft: '-32px',
				marginRight: '-32px',
				display: 'flex',
				userSelect: 'none',
			})}
		>
			<div
				className={css({
					flex: '1 1 0',
					padding: '48px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				})}
			>
				<div {...attributes}>{children}</div>
				<div contentEditable={false}>
					<SocialLinks />
				</div>
			</div>
			<div
				className={css({
					boxSizing: 'content-box',
					userSelect: 'none',
					paddingTop: '48px',
					paddingRight: '48px',
					paddingBottom: '48px',
					width: '400px',
					height: '300px',
					position: 'relative',
				})}
				contentEditable={false}
			>
				<Profile />
			</div>
		</div>
	)
}
