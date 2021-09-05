import { BannerNameElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'
import { nanoid } from 'nanoid'
import { HeadingXXLarge } from 'baseui/typography'

export const generateBannerNameElement = (): BannerNameElement => ({
	id: nanoid(),
	type: 'banner-name',
	children: [{ text: '' }],
})

export const BannerName = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerNameElement>) => {
	return (
		<HeadingXXLarge
			overrides={{
				Block: {
					style: {
						fontWeight: 'bold',
						position: 'relative',
					},
				},
			}}
			color={OpenColor.gray[8]}
			{...attributes}
		>
			<Placeholder element={element}>이름</Placeholder>
			{children}
		</HeadingXXLarge>
	)
}
