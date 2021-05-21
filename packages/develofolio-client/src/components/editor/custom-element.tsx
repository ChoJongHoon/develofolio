import React, { useMemo } from 'react'
import { EmotionJSX } from '@emotion/react/types/jsx-namespace'
import {
	RenderElementProps,
	DefaultElement,
	useSlateStatic,
	ReactEditor,
} from 'slate-react'
import { Draggable } from './dnd/draggable'
import { Logo } from './logo/logo'
import { Heading } from './elements/heading'

export const CustomElement = (props: RenderElementProps) => {
	const { element, attributes, children } = props

	const editor = useSlateStatic()

	const path = useMemo(() => ReactEditor.findPath(editor, element), [
		editor,
		element,
	])

	let data: EmotionJSX.Element

	switch (element.type) {
		case 'logo':
			data = (
				<Logo attributes={attributes} element={element}>
					{children}
				</Logo>
			)
			break
		case 'heading':
			data = (
				<Heading attributes={attributes} element={element}>
					{children}
				</Heading>
			)
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
