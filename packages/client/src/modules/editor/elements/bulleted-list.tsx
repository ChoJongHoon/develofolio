import { Cell } from 'baseui/layout-grid'
import { useStyletron } from 'styletron-react'
import {
	BulletedListElement,
	CustomRenderElementProps,
	WithId,
} from '../custom-types'
import { RootDraggable } from '../dnd/root-draggable'

export const BulletedList = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<WithId<BulletedListElement>>) => {
	const [css] = useStyletron()
	return (
		<RootDraggable id={element.id} element={element}>
			<Cell span={[4, 8, 12]}>
				<ul
					{...attributes}
					className={css({
						listStyle: 'none',
					})}
				>
					{children}
				</ul>
			</Cell>
		</RootDraggable>
	)
}
