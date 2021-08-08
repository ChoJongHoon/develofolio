import { Cell } from 'baseui/layout-grid'
import OpenColor from 'open-color'
import { Element } from 'slate'
import { useStyletron } from 'styletron-react'
import { StyleObject } from 'styletron-standard'
import {
	CustomRenderElementProps,
	HeadingElement,
	WithId,
} from '../custom-types'
import { RootDraggable } from '../dnd/root-draggable'
import { Placeholder } from '../placeholder/placeholder'

export const isHeading = (
	element: Partial<Element>
): element is HeadingElement => element.type === 'heading'

export const Heading = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<WithId<HeadingElement>>) => {
	const [css] = useStyletron()

	const CustomTag = `h${element.level}` as const
	return (
		<RootDraggable
			id={element.id}
			overrides={{
				Grid: {
					style: {
						marginTop:
							element.level === 1
								? '60px'
								: element.level === 2
								? '33.6px'
								: '20px',
					},
				},
			}}
			className={css({})}
		>
			<Cell span={[4, 8, 12]}>
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
					<Placeholder element={element}>Heading {element.level}</Placeholder>
					{children}
				</CustomTag>
			</Cell>
		</RootDraggable>
	)
}

const h1Styles: StyleObject = {
	fontSize: '30px',
	lineHeight: 1.5,
}

const h2Styles: StyleObject = {
	fontSize: '24px',
	lineHeight: 1.3,
}

const h3Styles: StyleObject = {
	fontSize: '20px',
	lineHeight: 1.2,
}

const beforeStyles: StyleObject = {
	userSelect: 'none',
	display: 'inline-block',
	width: '4px',
	height: '45px',
	backgroundColor: OpenColor.teal[6],
	marginRight: '16px',
	verticalAlign: 'bottom',
}
