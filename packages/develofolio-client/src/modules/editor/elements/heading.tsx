import OpenColor from 'open-color'
import { Element } from 'slate'
import { useStyletron } from 'styletron-react'
import { StyleObject } from 'styletron-standard'
import { CustomRenderElementProps, HeadingElement } from '../custom-types'

export const isHeading = (
	element: Partial<Element>
): element is HeadingElement => element.type === 'heading'

export const Heading = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<HeadingElement>) => {
	const [css] = useStyletron()

	const CustomTag = `h${element.level}` as const
	return (
		<CustomTag
			{...attributes}
			className={css(
				element.level === 1
					? h1Styles
					: element.level === 2
					? h2Styles
					: h3Styles
			)}
		>
			{element.level === 1 && (
				<span className={css(beforeStyles)} contentEditable={false} />
			)}
			{children}
		</CustomTag>
	)
}

const h1Styles: StyleObject = {
	fontSize: '30px',
	lineHeight: 1.5,
	marginTop: '2em',
}

const h2Styles: StyleObject = {
	fontSize: '24px',
	lineHeight: 1.3,
	marginTop: '1.4em',
}

const h3Styles: StyleObject = {
	fontSize: '20px',
	lineHeight: 1.2,
	marginTop: '1em',
}

const beforeStyles: StyleObject = {
	userSelect: 'none',
	display: 'inline-block',
	width: '4px',
	height: '45px',
	backgroundColor: OpenColor.teal[6],
	marginRight: '16px',
}
