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
import { BlockPicker } from './blocks/block-picker'
import { useBlocks } from './blocks/use-blocks'
import OpenColor from 'open-color'
import { withSkillList } from './skill-list/with-skill-list'

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
					withBanner(
						withSkillList(withLogo(withShortcuts(withNodeId(createEditor()))))
					)
				)
			),
		[]
	)

	const [content, setContent] = useState<Descendant[]>(initialContent)

	const { handleIconPicker } = useLogoPicker(editor)
	const { onAddBlockButtonClick } = useBlocks(editor)

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
		<div css={rootStyles}>
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
					<BlockPicker />
				</Slate>
			</DndProvider>
			<button css={addBlockButton} onMouseDown={onAddBlockButtonClick}>
				Add a Block
			</button>
		</div>
	)
}

const rootStyles = css`
	display: flex;
	flex-direction: column;
	padding-bottom: 30vh;
`

const editorStyles = css`
	padding-left: 32px;
	padding-right: 32px;

	[data-slate-node='element'] {
		position: relative;
		& > * {
			vertical-align: middle;
			font-size: var(--font-size);
			line-height: var(--line-height);
		}
	}
`

const addBlockButton = css`
	margin-left: 32px;
	margin-right: 32px;
	padding: 32px;
	background: none;
	cursor: pointer;
	border-radius: 8px;
	border: dotted 1px ${OpenColor.gray[4]};
	color: ${OpenColor.gray[4]};
	transition: border-color 0.2s, color 0.2s;
	&:hover {
		border: dotted 1px ${OpenColor.gray[6]};
		color: ${OpenColor.gray[6]};
	}
`
