import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { renderElement } from './elements'
import { withIcon } from './elements/icon'
import { withMarkdown } from './elements/markdown'
import { HoveringToolbar } from './hovering-toolbar'
import { renderLeaf, toggleFormat } from './elements/format'
import { css } from '@emotion/react'

export function Editor() {
	const editor = useMemo(
		() => withHistory(withReact(withIcon(withMarkdown(createEditor())))),
		[]
	)

	const [value, setValue] = useState<Descendant[]>([
		{ type: 'heading-one', children: [{ text: '이채영 (@Luna Lee)' }] },
		{
			type: 'paragraph',
			children: [{ text: '안녕하세요 프론트엔드 엔지니어 이채영입니다.' }],
		},
		{
			type: 'bulleted-list',
			children: [
				{
					type: 'list-item',
					children: [
						{ text: '' },
						{
							type: 'icon',
							name: 'React',
							shortname: 'react',
							url: 'https://facebook.github.io/react/',
							file: 'react.svg',
							children: [{ text: '' }],
						},
						{ text: ' React' },
					],
				},
				{
					type: 'list-item',
					children: [
						{ text: '' },
						{
							type: 'icon',
							name: 'Apollo',
							shortname: 'apollostack',
							url: 'http://www.apollostack.com/',
							file: 'apollostack.svg',
							children: [{ text: '' }],
						},
						{ text: ' Apollo client' },
					],
				},
				{
					type: 'list-item',
					children: [
						{ text: '' },
						{
							type: 'icon',
							name: 'Typescript',
							shortname: 'typescript',
							url: 'https://www.typescriptlang.org/',
							file: 'typescript-icon.svg',
							children: [{ text: '' }],
						},
						{ text: ' TypeScript' },
					],
				},
				{
					type: 'list-item',
					children: [
						{ text: '' },
						{
							type: 'icon',
							name: 'GraphQL',
							shortname: 'graphql',
							url: 'http://graphql.org/',
							file: 'graphql.svg',
							children: [{ text: '' }],
						},
						{ text: ' GraphQL' },
					],
				},
			],
		},
		{ type: 'paragraph', children: [{ text: '' }] },
	])

	const onChnage = useCallback(
		(newValue: Descendant[]) => setValue(newValue),
		[]
	)

	return (
		<Slate editor={editor} value={value} onChange={onChnage}>
			<HoveringToolbar />
			<Editable
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				spellCheck={false}
				onDOMBeforeInput={(event) => {
					switch (event.inputType) {
						case 'formatBold':
							event.preventDefault()
							return toggleFormat(editor, 'bold')
						case 'formatItalic':
							event.preventDefault()
							return toggleFormat(editor, 'italic')
					}
				}}
				css={editorStyles}
			/>
		</Slate>
	)
}

const editorStyles = css`
	[data-slate-node='element'] > * {
		vertical-align: middle;
	}
`
