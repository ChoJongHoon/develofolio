import { Cell } from 'baseui/layout-grid'
import OpenColor from 'open-color'
import { useStyletron } from 'styletron-react'
import {
	BlockquoteElement,
	CustomRenderElementProps,
	WithId,
} from '../custom-types'
import { RootDraggable } from '../dnd/root-draggable'
import { Placeholder } from '../placeholder/placeholder'

export const Blockquote = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<WithId<BlockquoteElement>>) => {
	const [css] = useStyletron()

	return (
		<RootDraggable id={element.id} element={element}>
			<Cell span={[4, 8, 12]}>
				<blockquote
					{...attributes}
					className={css({
						borderLeftStyle: 'solid',
						borderLeftWidth: '3px',
						borderLeftColor: OpenColor.gray[7],
						paddingLeft: '14px',
						paddingTop: '2px',
						paddingBottom: '2px',
						position: 'relative',
					})}
				>
					<Placeholder element={element}>Empty quote</Placeholder>
					{children}
				</blockquote>
			</Cell>
		</RootDraggable>
	)
}
