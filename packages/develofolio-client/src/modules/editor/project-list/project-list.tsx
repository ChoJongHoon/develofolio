import OpenColor from 'open-color'
import { transitions } from 'polished'
import { useCallback } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon } from '~/components/icon'
import { CustomRenderElementProps, ProjectListElement } from '../custom-types'
import { EMPTY_PROJECT_LIST_ITEM } from './project-list-item'

export const ProjectList = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<ProjectListElement>) => {
	const [css] = useStyletron()
	const editor = useSlateStatic()

	const onAdd = useCallback(() => {
		const path = ReactEditor.findPath(editor, element)
		Transforms.insertNodes(editor, EMPTY_PROJECT_LIST_ITEM, {
			at: [...path, element.children.length],
		})
	}, [editor, element])

	return (
		<div
			{...attributes}
			className={css({
				display: 'grid',
				gridTemplateColumns: 'repeat(3, 1fr)',
				gap: '16px',
			})}
		>
			{children}
			{element.children.length < 3 && (
				<button
					onClick={onAdd}
					contentEditable={false}
					className={css({
						userSelect: 'none',
						borderStyle: 'none',
						cursor: 'pointer',
						backgroundColor: OpenColor.white,
						borderRadius: '8px',
						':hover': {
							backgroundColor: OpenColor.gray[1],
						},
						...transitions(['background-color'], '0.2s'),
					})}
				>
					<Icon type="Plus" color={OpenColor.gray[5]} size={64} />
				</button>
			)}
		</div>
	)
}
