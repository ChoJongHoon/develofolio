import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { HoveringToolbar } from './hovering-toolbar'
import { renderLeaf, toggleFormat } from './elements/format'
import { css } from '@emotion/react'
import { withNodeId } from './node-id/with-node-id'
import { nanoid } from 'nanoid'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CustomElement } from './custom-element'
import { withLogo } from './logo/with-logo'
import LogoPicker from './logo/logo-picker'
import { useLogoPicker } from './logo/use-logo-picker'
import { withShortcuts } from './shortcuts/with-shortcuts'
import { withBanner } from './banner/with-banner'

export function Editor() {
	const editor = useMemo(
		() =>
			withHistory(
				withReact(
					withBanner(withLogo(withShortcuts(withNodeId(createEditor()))))
				)
			),
		[]
	)

	const [value, setValue] = useState<Descendant[]>([
		{
			key: nanoid(),
			type: 'banner',
			children: [
				{
					key: nanoid(),
					type: 'banner-name',
					children: [{ text: '이채영 ' }, { text: '(@Luna Lee)', bold: true }],
				},
				{
					key: nanoid(),
					type: 'banner-tagline',
					children: [{ text: 'Jr. Front-end Enginner' }],
				},
				{
					key: nanoid(),
					type: 'banner-bio',
					children: [
						{
							text:
								'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non tortor quis eros elementum molestie. Etiam tempor tortor vitae felis porttitor egestas ac ac eros. Donec accumsan purus lorem, quis feugiat orci efficitur id.',
						},
					],
				},
			],
		},
		{
			key: nanoid(),
			type: 'heading',
			level: 1,
			children: [{ key: nanoid(), text: 'What I Do' }],
		},
		{
			key: nanoid(),
			type: 'bulleted-list',
			children: [
				{
					key: nanoid(),
					type: 'list-item',
					children: [
						{ key: nanoid(), text: '' },
						{
							key: nanoid(),
							type: 'logo',
							name: 'React',
							shortname: 'react',
							url: 'https://facebook.github.io/react/',
							file: 'react.svg',
							children: [{ text: '' }],
						},
						{ key: nanoid(), text: ' React' },
					],
				},
				{
					key: nanoid(),
					type: 'list-item',
					children: [
						{ key: nanoid(), text: '' },
						{
							key: nanoid(),
							type: 'logo',
							name: 'Apollo',
							shortname: 'apollostack',
							url: 'http://www.apollostack.com/',
							file: 'apollostack.svg',
							children: [{ text: '' }],
						},
						{ key: nanoid(), text: ' Apollo client' },
					],
				},
				{
					key: nanoid(),
					type: 'list-item',
					children: [
						{ key: nanoid(), text: '' },
						{
							key: nanoid(),
							type: 'logo',
							name: 'Typescript',
							shortname: 'typescript',
							url: 'https://www.typescriptlang.org/',
							file: 'typescript-icon.svg',
							children: [{ text: '' }],
						},
						{ key: nanoid(), text: ' TypeScript' },
					],
				},
				{
					key: nanoid(),
					type: 'list-item',
					children: [
						{ key: nanoid(), text: '' },
						{
							key: nanoid(),
							type: 'logo',
							name: 'GraphQL',
							shortname: 'graphql',
							url: 'http://graphql.org/',
							file: 'graphql.svg',
							children: [{ text: '' }],
						},
						{ key: nanoid(), text: ' GraphQL' },
					],
				},
			],
		},
		{
			key: nanoid(),
			type: 'paragraph',
			children: [{ key: nanoid(), text: '' }],
		},
	])

	const onChnage = useCallback(
		(newValue: Descendant[]) => setValue(newValue),
		[]
	)

	const { handleIconPicker } = useLogoPicker(editor)

	const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
		(event) => {
			if (handleIconPicker(event)) {
				event.preventDefault()
			}
		},
		[handleIconPicker]
	)

	return (
		<DndProvider backend={HTML5Backend}>
			<Slate editor={editor} value={value} onChange={onChnage}>
				<Editable
					renderElement={CustomElement}
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
					onKeyDown={onKeyDown}
				/>

				<HoveringToolbar />
				<LogoPicker />
			</Slate>
		</DndProvider>
	)
}

const editorStyles = css`
	padding-left: 32px;
	padding-right: 32px;

	[data-slate-node='element'] > * {
		vertical-align: middle;
		font-size: var(--font-size);
		line-height: var(--line-height);
	}
`
