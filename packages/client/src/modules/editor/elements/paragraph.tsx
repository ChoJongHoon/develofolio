import { Cell } from 'baseui/layout-grid'
import OpenColor from 'open-color'
import { useSelected } from 'slate-react'
import { StyleObject, useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ParagraphElement,
	WithKey,
} from '../custom-types'
import { RootDraggable } from '../dnd/root-draggable'
import { Placeholder } from '../placeholder/placeholder'

export const EMPTY_PARAGRAPH: ParagraphElement = {
	type: 'paragraph',
	children: [{ text: '' }],
}

export const Paragraph = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<WithKey<ParagraphElement>>) => {
	const [css] = useStyletron()
	const selected = useSelected()

	return (
		<RootDraggable id={element.key}>
			<Cell span={[4, 8, 12]}>
				<p {...attributes} className={css(styles)}>
					{selected && (
						<Placeholder element={element}>
							마크다운을 이용해 작성해보세요!
						</Placeholder>
					)}
					{children}
				</p>
			</Cell>
		</RootDraggable>
	)
}

const styles: StyleObject = {
	fontSize: '16px',
	lineHeight: 1.5,
	color: OpenColor.gray[7],
	position: 'relative',
}
