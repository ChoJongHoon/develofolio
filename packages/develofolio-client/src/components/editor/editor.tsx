import React, { useCallback, useMemo } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { HoveringToolbar } from './hovering-toolbar'
import { renderLeaf, toggleFormat } from './elements/format'
import { css } from '@emotion/react'
import { withNodeId } from './node-id/with-node-id'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CustomElement } from './custom-element'
import { withLogo } from './logo/with-logo'
import LogoPicker from './logo/logo-picker'
import { useLogoPicker } from './logo/use-logo-picker'
import { withShortcuts } from './shortcuts/with-shortcuts'
import { withBanner } from './banner/with-banner'
import { useEditor } from './hooks/use-editor'

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

	const { onChange, value } = useEditor()

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
			<Slate editor={editor} value={value} onChange={onChange}>
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
	padding-bottom: 30vh;

	[data-slate-node='element'] {
		position: relative;
		& > * {
			vertical-align: middle;
			font-size: var(--font-size);
			line-height: var(--line-height);
		}
	}
`
