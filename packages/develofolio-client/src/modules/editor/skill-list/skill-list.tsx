import OpenColor from 'open-color'
import { border, padding, transitions } from 'polished'
import { useCallback } from 'react'
import mergeRefs from 'react-merge-refs'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon } from '~/components/icon'
import { useHover } from '~/hooks/use-hover'
import {
	CustomRenderElementProps,
	SkillListElement,
	SkillListItemElement,
} from '../custom-types'

export const SkillList = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListElement>) => {
	const [css] = useStyletron()
	const [hoverRef, isHover] = useHover<HTMLUListElement>()
	const [addButtonHoverRef, isAddButtonHover] = useHover<HTMLButtonElement>()

	const editor = useSlateStatic()

	const onSkillAdd = useCallback(() => {
		const path = ReactEditor.findPath(editor, element)
		const newProperties: SkillListItemElement = {
			type: 'skill-list-item',
			children: [
				{
					type: 'skill-list-item-logos',
					logos: [],
					children: [{ text: '' }],
				},
				{ type: 'skill-list-item-name', children: [{ text: 'Name' }] },
				{
					type: 'skill-list-item-description',
					children: [{ text: 'Description' }],
				},
			],
		}
		Transforms.insertNodes(editor, newProperties, {
			at: path.concat(element.children.length),
		})
	}, [editor, element])

	return (
		<ul
			{...attributes}
			className={css({
				display: 'grid',
				gridTemplateColumns: 'repeat(4, 1fr)',
				gap: '16px',
			})}
			ref={mergeRefs([attributes.ref, hoverRef])}
		>
			{children}
			<button
				ref={addButtonHoverRef}
				contentEditable={false}
				onClick={onSkillAdd}
				className={css({
					display: isHover ? 'block' : 'none',
					backgroundColor: 'transparent',
					borderStyle: 'none',
					borderRadius: '8px',
					cursor: 'pointer',
					minHeight: '68px',
					...transitions(['border-color'], '0.2s'),
					...border('1px', 'dotted', OpenColor.gray[3]),
					':hover': {
						borderColor: OpenColor.gray[6],
					},
				})}
			>
				<Icon
					type="Plus"
					size={16}
					className={css({
						fill: isAddButtonHover ? OpenColor.gray[6] : OpenColor.gray[3],
						...transitions(['fill'], '0.2s'),
					})}
				/>
			</button>
		</ul>
	)
}
