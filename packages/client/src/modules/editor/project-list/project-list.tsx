import { Cell, Grid } from 'baseui/layout-grid'
import OpenColor from 'open-color'
import { borderRadius, borderStyle, padding, transitions } from 'polished'
import { useCallback } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSelected, useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon } from '~/components/icon'
import { useHover } from '~/hooks/use-hover'
import {
	CustomRenderElementProps,
	ProjectListElement,
	WithKey,
} from '../custom-types'
import { RootDraggable } from '../dnd/root-draggable'
import { EMPTY_PROJECT_LIST_ITEM } from './project-list-item'

export const EMPTY_PROJECT_LIST: ProjectListElement = {
	type: 'project-list',
	children: [EMPTY_PROJECT_LIST_ITEM],
}

export const ProjectList = ({
	children,
	element,
}: CustomRenderElementProps<WithKey<ProjectListElement>>) => {
	const [css] = useStyletron()
	const editor = useSlateStatic()

	const [hoverRef, isHover] = useHover<HTMLDivElement>()
	const isSelected = useSelected()

	const onAdd = useCallback(() => {
		const path = ReactEditor.findPath(editor, element)
		Transforms.insertNodes(editor, EMPTY_PROJECT_LIST_ITEM, {
			at: [...path, element.children.length],
		})
	}, [editor, element])

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
						onClick={onAdd}
						className={css({
							...borderStyle('none'),
							...borderRadius('left', '4px'),
							...borderRadius('right', '4px'),
							color: OpenColor.gray[6],
							cursor: 'pointer',
							...padding('2px', '6px'),
							...transitions(['background-color', 'opacity'], '0.2s'),
							backgroundColor: 'transparent',
							opacity: isHover || isSelected ? 1 : 0,
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
				id={element.key}
				overrides={{
					Grid: {
						style: {
							rowGap: '32px',
						},
					},
				}}
			>
				{children}
			</RootDraggable>
		</div>
	)
}
