import { Cell, Grid } from 'baseui/layout-grid'
import { nanoid } from 'nanoid'
import OpenColor from 'open-color'
import { borderRadius, borderStyle, padding, transitions } from 'polished'
import { useCallback } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon } from '~/components/icon'
import { useHover } from '~/hooks/use-hover'
import { CustomRenderElementProps, CareerListElement } from '../custom-types'
import { RootDraggable } from '../dnd/root-draggable'
import { generateCareerListItemElement } from './career-list-item'

export const generateCareerListElement = (): CareerListElement => ({
	id: nanoid(),
	type: 'career-list',
	children: [generateCareerListItemElement()],
})

export const CareerList = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<CareerListElement>) => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()
	const isSelected = useSelected()
	const editor = useSlateStatic()

	return (
		<div ref={hoverRef}>
			<Grid
				overrides={{
					Grid: {
						props: {
							contentEditable: false,
						},
						style: {
							userSelect: 'none',
							marginBottom: '8px',
						},
					},
				}}
			>
				<Cell span={[4, 8, 12]}>
					<button
						onClick={() => {
							const path = ReactEditor.findPath(editor, element)
							Transforms.insertNodes(editor, generateCareerListItemElement(), {
								at: [...path, element.children.length],
							})
						}}
						className={css({
							...borderStyle('none'),
							...borderRadius('left', '4px'),
							...borderRadius('right', '4px'),
							color: OpenColor.gray[6],
							cursor: 'pointer',
							...padding('2px', '6px'),
							...transitions(['background-color', 'opacity'], '0.2s'),
							backgroundColor: 'transparent',
							opacity: isHovered || isSelected ? 1 : 0,
							':hover': {
								backgroundColor: OpenColor.gray[2],
							},
						})}
					>
						<Icon
							type="Plus"
							size={12}
							color={OpenColor.gray[6]}
							className={css({ marginRight: '8px' })}
						/>
						Add a new
					</button>
				</Cell>
			</Grid>
			<RootDraggable
				id={element.id}
				element={element}
				overrides={{
					Grid: {
						props: {
							...attributes,
						},
					},
				}}
			>
				{children}
			</RootDraggable>
		</div>
	)
}
