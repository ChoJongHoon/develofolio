import React, { useMemo } from 'react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import {
	RenderElementProps,
	DefaultElement,
	useSlateStatic,
	ReactEditor,
} from 'slate-react'
import { Draggable } from '../dnd/draggable'
import { Icon } from './icon'

export const CustomElement = (props: RenderElementProps) => {
	const { element, attributes, children } = props

	const editor = useSlateStatic()

	const path = useMemo(() => ReactEditor.findPath(editor, element), [
		editor,
		element,
	])

	let data: EmotionJSX.Element

	switch (element.type) {
		case 'icon':
			data = (
				<Icon attributes={attributes} element={element}>
					{children}
				</Icon>
			)
			break
		case 'heading-one':
			data = <h1 {...attributes}>{children}</h1>
			break
		case 'heading-two':
			data = <h2 {...attributes}>{children}</h2>
			break
		case 'heading-three':
			data = <h3 {...attributes}>{children}</h3>
			break
		case 'block-quote':
			data = <blockquote {...attributes}>{children}</blockquote>
			break
		case 'bulleted-list':
			data = <ul {...attributes}>{children}</ul>
			break
		case 'list-item':
			data = <li {...attributes}>{children}</li>
			break
		default:
			data = (
				<DefaultElement attributes={attributes} element={element}>
					{children}
				</DefaultElement>
			)
	}

	if (path.length === 1) {
		return <Draggable id={element.key as string}>{data}</Draggable>
	}

	return data
}
