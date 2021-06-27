import { DropTargetMonitor, useDrop } from 'react-dnd'
import { Editor, Path, Transforms } from 'slate'
import { ReactEditor } from 'slate-react'
import { findNode } from '../../utils/find-node'
import { isExpanded } from '../../utils/is-expanded'
import { DragItemBlock, DropDirection } from '../types'
import { getHoverDirection } from '../utils/get-hover-direction'
import { getNewDirection } from '../utils/get-new-direction'

export const useDropBlockOnEditor = (
	editor: Editor,
	{
		blockRef,
		id,
		dropLine,
		setDropLine,
	}: {
		blockRef: any
		id: string
		dropLine: DropDirection
		setDropLine: (dropLine: 'top' | 'bottom') => void
	}
) => {
	return useDrop({
		accept: 'block',
		drop: (dragItem: DragItemBlock, monitor: DropTargetMonitor) => {
			const direction = getHoverDirection(dragItem, monitor, blockRef, id)
			if (!direction) return

			const dragEntry = findNode(editor, {
				at: [],
				match: (n) => Editor.isBlock(editor, n) && n.key === dragItem.id,
			})
			if (!dragEntry) return
			const [, dragPath] = dragEntry

			ReactEditor.focus(editor)

			let dropPath: Path | undefined
			if (direction === 'bottom') {
				dropPath = findNode(editor, {
					at: [],
					match: (n) => Editor.isBlock(editor, n) && n.key === id,
				})?.[1]
				if (!dropPath) return

				if (Path.equals(dragPath, Path.next(dropPath))) return
			}

			if (direction === 'top') {
				const nodePath = findNode(editor, {
					at: [],
					match: (n) => Editor.isBlock(editor, n) && n.key === id,
				})?.[1]

				if (!nodePath) return
				dropPath = [...nodePath.slice(0, -1), nodePath[nodePath.length - 1] - 1]

				if (Path.equals(dragPath, dropPath)) return
			}

			if (direction) {
				const _dropPath = dropPath as Path

				const before =
					Path.isBefore(dragPath, _dropPath) &&
					Path.isSibling(dragPath, _dropPath)
				const to = before ? _dropPath : Path.next(_dropPath)

				Transforms.moveNodes(editor, {
					at: dragPath,
					to,
				})
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
		hover(item: DragItemBlock, monitor: DropTargetMonitor) {
			const direction = getHoverDirection(item, monitor, blockRef, id)
			const dropLineDir = getNewDirection(dropLine, direction)
			if (dropLineDir) setDropLine(dropLineDir)

			if (direction && isExpanded(editor.selection)) {
				ReactEditor.focus(editor)
				Transforms.collapse(editor)
			}
		},
	})
}
