import { css } from '@emotion/react'
import React from 'react'
import { Editor, Transforms } from 'slate'
import {
	CustomRenderElementProps,
	IconElement,
} from '~/components/editor/slate'

export const withIcon = (editor: Editor) => {
	const { isInline, isVoid } = editor

	editor.isInline = (element) =>
		element.type === 'icon' ? true : isInline(element)

	editor.isVoid = (element) =>
		element.type === 'icon' ? true : isVoid(element)

	return editor
}

export const insertIcon = (
	editor: Editor,
	input: Omit<IconElement, 'type'>
) => {
	const mention: IconElement = {
		type: 'icon',
		...input,
	}
	Transforms.insertNodes(editor, mention)
	Transforms.move(editor)
}

export const Icon = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<IconElement>) => {
	return (
		<span {...attributes} contentEditable={false} css={wrapper}>
			<img src={`/logos/${element.file}`} css={imgStyles} />
			{children}
		</span>
	)
}

const wrapper = css`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: relative;
`

const imgStyles = css`
	height: 16px;
	display: block;
`
