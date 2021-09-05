import { BannerBioElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'
import { nanoid } from 'nanoid'
import { ParagraphMedium } from 'baseui/typography'

export const generateBannerBioElement = (): BannerBioElement => ({
	id: nanoid(),
	type: 'banner-bio',
	children: [{ text: '' }],
})

export const BannerBio = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerBioElement>) => {
	return (
		<ParagraphMedium
			overrides={{
				Block: {
					style: {
						marginTop: '16px',
						marginBottom: '16px',
						position: 'relative',
					},
				},
			}}
			color={OpenColor.gray[7]}
			{...attributes}
		>
			<Placeholder element={element}>간단한 소개</Placeholder>
			{children}
		</ParagraphMedium>
	)
}
