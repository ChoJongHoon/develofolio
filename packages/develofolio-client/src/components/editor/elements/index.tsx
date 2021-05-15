import React from 'react'
import { RenderElementProps, DefaultElement } from 'slate-react'
import { Icon } from './icon'

export const renderElement = ({
	element,
	attributes,
	children,
}: RenderElementProps) => {
	switch (element.type) {
		case 'icon':
			return (
				<Icon {...attributes} element={element}>
					{children}
				</Icon>
			)
		case 'heading-one':
			return <h1 {...attributes}>{children}</h1>
		case 'heading-two':
			return <h2 {...attributes}>{children}</h2>
		case 'heading-three':
			return <h3 {...attributes}>{children}</h3>
		case 'block-quote':
			return <blockquote {...attributes}>{children}</blockquote>
		case 'bulleted-list':
			return <ul {...attributes}>{children}</ul>
		case 'list-item':
			return <li {...attributes}>{children}</li>
	}
	return (
		<DefaultElement attributes={attributes} element={element}>
			{children}
		</DefaultElement>
	)
}
