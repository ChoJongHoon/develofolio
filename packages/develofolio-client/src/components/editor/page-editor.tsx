import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
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
import { useDispatch } from 'react-redux'
import { setSaved, setSaving } from './editor.reducer'
import { useDebounceEffect } from '~/lib/hooks/use-debounce-effect'
import { useMutation } from '@apollo/client'
import { SavePageDocument } from '~/graphql/typed-document-nodes.generated'

interface PageEditorProps {
	initialContent: Descendant[]
	className?: string
}

export const PageEditor = ({ initialContent }: PageEditorProps) => {
	const dispatch = useDispatch()
	const editor = useMemo(
		() =>
			withHistory(
				withReact(
					withBanner(withLogo(withShortcuts(withNodeId(createEditor()))))
				)
			),
		[]
	)

	const [content, setContent] = useState<Descendant[]>(initialContent)

	const { handleIconPicker } = useLogoPicker(editor)

	const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
		(event) => {
			if (handleIconPicker(event)) {
				event.preventDefault()
			}
		},
		[handleIconPicker]
	)

	const onChange = useCallback((newContent: Descendant[]) => {
		setContent(newContent)
	}, [])

	const [savePage] = useMutation(SavePageDocument, {
		onCompleted: () => {
			dispatch(setSaving(false))
			dispatch(setSaved(true))
		},
	})

	useEffect(() => {
		dispatch(setSaved(false))
	}, [dispatch, content])

	useDebounceEffect(
		() => {
			dispatch(setSaving(true))
			savePage({
				variables: {
					content,
				},
			})
		},
		1000,
		[content]
	)

	return (
		<DndProvider backend={HTML5Backend}>
			<Slate editor={editor} value={content} onChange={onChange}>
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
