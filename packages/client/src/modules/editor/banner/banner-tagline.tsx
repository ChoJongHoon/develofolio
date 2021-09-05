import { BannerTaglineElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'
import { nanoid } from 'nanoid'
import { HeadingSmall } from 'baseui/typography'

export const generateBannerTaglineElement = (): BannerTaglineElement => ({
	id: nanoid(),
	type: 'banner-tagline',
	children: [{ text: '' }],
})

export const BannerTagline = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerTaglineElement>) => {
	return (
		<HeadingSmall
			overrides={{
				Block: {
					style: {
						position: 'relative',
					},
				},
			}}
			color={OpenColor.gray[6]}
			{...attributes}
		>
			<Placeholder element={element}>직책</Placeholder>
			{children}
		</HeadingSmall>
	)
}
