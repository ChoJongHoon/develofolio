import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { toggleFormat } from './leaf/utils'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CustomElement } from './custom-element'
import { withLogo } from './logo/with-logo'
import { InlineLogoPicker } from './logo/inline-logo-picker'
import { useLogoPicker } from './logo/use-logo-picker'
import { withShortcuts } from './shortcuts/with-shortcuts'
import { withBanner } from './banner/with-banner'
import { useDebounceEffect } from '~/hooks/use-debounce-effect'
import { useMutation } from '@apollo/client'
import { BlockPicker } from './blocks/block-picker'
import { useBlocks } from './blocks/use-blocks'
import OpenColor from 'open-color'
import { withSkillList } from './skill-list/with-skill-list'
import { useStyletron } from 'baseui'
import { borderColor, borderStyle, borderWidth, padding } from 'polished'
import classNames from 'classnames'
import { withEditor } from './with-editor'
import { withProjectList } from './project-list/with-project-list'
import { Cell, Grid } from 'baseui/layout-grid'
import { UpdateContentDocument } from '~/graphql/document.generated'
import { CustomLeaf } from './leaf/custom-leaf'
import { Toolbar } from './leaf/toolbar'
import { useSetRecoilState } from 'recoil'
import { saveState } from './editor.atoms'
import { useSchoolPicker } from './school-list/use-school-picker'
import { SchoolPicker } from './school-list/school-picker'
import { withSchoolList } from './school-list/with-school-list'
import { withCareerList } from './career-list/with-carrer-list'
import { isModKey } from './utils/is-mod-key'

const PLUGINS = [
	withEditor,
	withHistory,
	withReact,
	withBanner,
	withSkillList,
	withProjectList,
	withLogo,
	withShortcuts,
	withSchoolList,
	withCareerList,
]

interface PageEditorProps {
	initialContent: Descendant[]
	className?: string
}

export const PageEditor = ({ className, initialContent }: PageEditorProps) => {
	const [css] = useStyletron()
	const setSave = useSetRecoilState(saveState)

	// https://github.com/ianstormtaylor/slate/issues/4081#issuecomment-782136472
	const editorRef = useRef<Editor>()
	if (!editorRef.current)
		editorRef.current = PLUGINS.reduce(
			(editor, plugin) => plugin(editor),
			createEditor()
		)
	const editor = editorRef.current

	const [content, setContent] = useState<Descendant[]>(initialContent)

	const [updateContent] = useMutation(UpdateContentDocument, {
		onCompleted: () => {
			setSave('SAVED')
		},
	})

	const saveContent = useCallback(() => {
		setSave('SAVING')
		updateContent({
			variables: {
				content,
			},
		})
	}, [content, setSave, updateContent])

	const { onKeyDown: onLogoPickerKeyDown } = useLogoPicker(editor)
	const {
		schools,
		onKeyDown: onSchoolPickerKeyDown,
		onKeyPress: onSchoolPickerPress,
		onSelectSchool,
	} = useSchoolPicker(editor)
	const { onAddBlockButtonClick } = useBlocks()

	const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
		(event) => {
			if (onLogoPickerKeyDown(event)) {
				event.preventDefault()
			}
			if (onSchoolPickerKeyDown(event)) {
				event.preventDefault()
			}
			if (event.key === 'Tab') {
				event.preventDefault()
				Transforms.move(editor, { distance: 1, unit: 'line' })
			}
			if (event.key === 'Enter' && event.shiftKey) {
				event.preventDefault()
				Transforms.insertText(editor, '\n')
			}
			if (isModKey(event)) {
				if (event.key === 's' || event.key === 'S') {
					event.preventDefault()
					saveContent()
				}
			}
		},
		[editor, onLogoPickerKeyDown, onSchoolPickerKeyDown, saveContent]
	)

	const onKeyPress = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
		(event) => {
			if (onSchoolPickerPress(event)) {
				event.preventDefault()
			}
		},
		[onSchoolPickerPress]
	)

	const onChange = useCallback((newContent: Descendant[]) => {
		setContent(newContent)
	}, [])

	useEffect(() => {
		setSave(null)
	}, [content, setSave])

	useDebounceEffect(
		() => {
			saveContent()
		},
		1000,
		[content]
	)

	return (
		<div
			className={classNames(
				className,
				css({
					paddingBottom: '10vh',
				})
			)}
		>
			<DndProvider backend={HTML5Backend}>
				<Slate editor={editor} value={content} onChange={onChange}>
					<Editable
						renderElement={CustomElement}
						renderLeaf={CustomLeaf}
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
						className={css({
							paddingBottom: '96px',
						})}
						onKeyDown={onKeyDown}
						onKeyPress={onKeyPress}
						autoCapitalize="false"
						autoCorrect="false"
						// https://github.com/ianstormtaylor/slate/pull/4299
						// 자체 drop event 을 skip 한다.
						// TODO: 블록 DnD 일때만 true 반환하도록
						onDrop={() => true}
					/>
					<Toolbar />
					<InlineLogoPicker />
					{schools && schools.length > 0 && (
						<SchoolPicker schools={schools} onSelect={onSelectSchool} />
					)}
					<BlockPicker />
				</Slate>
			</DndProvider>
			<Grid>
				<Cell span={[4, 8, 12]}>
					<button
						className={css({
							width: '100%',
							boxSizing: 'border-box',
							...padding('48px', '16px'),
							background: 'none',
							cursor: 'pointer',
							borderRadius: '8px',
							color: OpenColor.gray[5],
							fontSize: '18px',
							...borderStyle('dashed'),
							...borderWidth('2px'),
							...borderColor(OpenColor.gray[5]),
							transitionDuration: '0.2s',
							transitionProperty: 'color, border-color, background-color',
							':hover': {
								...borderColor(OpenColor.gray[6]),
								color: OpenColor.gray[6],
								backgroundColor: OpenColor.gray[0],
							},
						})}
						onMouseDown={onAddBlockButtonClick}
					>
						Add a Block
					</button>
				</Cell>
			</Grid>
		</div>
	)
}
