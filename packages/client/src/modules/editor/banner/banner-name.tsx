import { BannerNameElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'
import { useStyletron } from 'styletron-react'
import { nanoid } from 'nanoid'

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
	const [css] = useStyletron()
	return (
		<h1
			className={css({
				fontSize: '48px',
				lineHeight: 1.5,
				color: OpenColor.gray[8],
				position: 'relative',
			})}
			{...attributes}
		>
			<Placeholder element={element}>이름</Placeholder>
			{children}
		</h1>
	)
}
