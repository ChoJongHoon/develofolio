import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { useMemo } from 'react'
import { Editor } from 'slate'
import { useSlateStatic } from 'slate-react'
import { CustomElement } from '../custom-types'

interface PlaceholderProps {
	children?: React.ReactNode
	element: CustomElement
}

export const Placeholder = ({ children, element }: PlaceholderProps) => {
	const editor = useSlateStatic()

	const isEmpty = useMemo(() => Editor.isEmpty(editor, element), [
		editor,
		element,
	])

	if (!isEmpty) {
		return <></>
	}

	return (
		<span
			contentEditable={false}
			data-slate-placeholder={true}
			css={placeholder}
		>
			{children}
		</span>
	)
}

const placeholder = css`
	color: ${OpenColor.gray[4]};
	position: absolute;
	pointer-events: none;
	user-select: none;
	text-decoration: none;
	width: 100%;
	max-width: 100%;
	display: block;
	color: ${OpenColor.gray[4]};
	opacity: 0.4;
`
