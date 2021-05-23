import React from 'react'
import { Editor, Text, Transforms } from 'slate'
import { RenderLeafProps } from 'slate-react'
import { LeafFormat } from '~/components/editor/custom-types'

export const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
	if (leaf.bold) children = <strong>{children}</strong>
	if (leaf.italic) children = <em>{children}</em>
	if (leaf.code) children = <code>{children}</code>

	return <span {...attributes}>{children}</span>
}

export const toggleFormat = (editor: Editor, format: LeafFormat) => {
	const isActive = isFormatActive(editor, format)
	Transforms.setNodes(
		editor,
		{ [format]: isActive ? null : true },
		{ match: Text.isText, split: true }
	)
}

export const isFormatActive = (editor: Editor, format: LeafFormat) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => Text.isText(n) && n[format] === true,
		mode: 'all',
	})
	return Boolean(match)
}
