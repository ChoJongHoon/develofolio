import { Cell } from 'baseui/layout-grid'
import { nanoid } from 'nanoid'
import OpenColor from 'open-color'
import { padding, transitions } from 'polished'
import { useCallback } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon } from '~/components/icon'
import { useHover } from '~/hooks/use-hover'
import { CustomRenderElementProps, SkillListItemElement } from '../custom-types'

export const generateSkillListItemElement = (): SkillListItemElement => ({
	id: nanoid(),
	type: 'skill-list-item',
	children: [
		{
			id: nanoid(),
			type: 'skill-list-item-logos',
			logos: [],
			children: [{ text: '' }],
		},
		{
			id: nanoid(),
			type: 'skill-list-item-name',
			children: [{ text: '' }],
		},
		{
			id: nanoid(),
			type: 'skill-list-item-description',
			children: [{ text: '' }],
		},
	],
})

export const SkillListItem = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemElement>) => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLDivElement>()
	const editor = useSlateStatic()
	const onRemove = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
		(event) => {
			event.preventDefault()
			const path = ReactEditor.findPath(editor, element)
			Transforms.removeNodes(editor, { at: path })
		},
		[editor, element]
	)

	return (
		<Cell span={[2, 2, 3]}>
			<div
				className={css({ listStyle: 'none', position: 'relative' })}
				ref={hoverRef}
			>
				<div {...attributes}>{children}</div>
				<button
					contentEditable={false}
					onClick={onRemove}
					className={css({
						borderStyle: 'none',
						display: 'flex',
						cursor: 'pointer',
						...padding('2px'),
						borderRadius: '4px',
						backgroundColor: OpenColor.red[7],
						opacity: isHovered ? 1 : 0,
						position: 'absolute',
						right: '0px',
						top: '0px',
						...transitions(['background-color', 'opacity'], '0.2s'),
						':hover': {
							backgroundColor: OpenColor.red[5],
						},
					})}
				>
					<Icon type="TrashLine" size={18} color={OpenColor.white} />
				</button>
			</div>
		</Cell>
	)
}
