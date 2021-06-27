import { BannerTaglineElement, CustomRenderElementProps } from '../custom-types'
import OpenColor from 'open-color'
import { Placeholder } from '../placeholder/placeholder'
import { useStyletron } from 'styletron-react'

export const BannerTagline = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<BannerTaglineElement>) => {
	const [css] = useStyletron()
	return (
		<h2
			className={css({
				fontSize: '24px',
				lineHeight: 1.2,
				marginTop: '4px',
				fontWeight: 500,
				color: OpenColor.gray[6],
			})}
			{...attributes}
		>
			<Placeholder element={element}>직책</Placeholder>
			{children}
		</h2>
	)
}
