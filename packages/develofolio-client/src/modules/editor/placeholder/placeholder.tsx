import React, { useMemo } from 'react'
import { Editor } from 'slate'
import { useSlateStatic } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { CustomElement } from '../custom-types'

interface PlaceholderProps {
	children?: React.ReactNode
	element: CustomElement
}

export const Placeholder = ({ children, element }: PlaceholderProps) => {
	const [css] = useStyletron()
	const editor = useSlateStatic()

	const isEmpty = useMemo(
		() => Editor.isEmpty(editor, element),
		[editor, element]
	)

	if (!isEmpty) {
		return <></>
	}

	return (
		<span
			contentEditable={false}
			data-slate-placeholder={true}
			className={css({
				position: 'absolute',
				pointerEvents: 'none',
				userSelect: 'none',
				textDecoration: 'none',
				width: '100%',
				maxWidth: '100%',
				opacity: 0.3,
			})}
		>
			{children}
		</span>
	)
}
