import { BannerBioElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'
import { useStyletron } from 'styletron-react'

export const generateBannerBioElement = (): BannerBioElement => ({
	type: 'banner-bio',
	children: [{ text: '' }],
})

export const BannerBio = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerBioElement>) => {
	const [css] = useStyletron()
	return (
		<p
			className={css({
				fontSize: '16px',
				lineHeight: 1.3,
				marginTop: '16px',
				color: OpenColor.gray[7],
				marginBottom: '16px',
				position: 'relative',
			})}
			{...attributes}
		>
			<Placeholder element={element}>간단한 소개</Placeholder>
			{children}
		</p>
	)
}
