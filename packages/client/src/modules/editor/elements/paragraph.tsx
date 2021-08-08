import { Cell } from 'baseui/layout-grid'
import { nanoid } from 'nanoid'
import OpenColor from 'open-color'
import { useSelected } from 'slate-react'
import { StyleObject, useStyletron } from 'styletron-react'
import {
	CustomRenderElementProps,
	ParagraphElement,
	WithId,
} from '../custom-types'
import { RootDraggable } from '../dnd/root-draggable'
import { Placeholder } from '../placeholder/placeholder'

export const generateParagraphElement = (): ParagraphElement => ({
	id: nanoid(),
	type: 'paragraph',
	children: [{ text: '' }],
})

export const Paragraph = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<WithId<ParagraphElement>>) => {
	const [css] = useStyletron()
	const selected = useSelected()

	return (
		<RootDraggable id={element.id}>
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
