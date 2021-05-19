import { useState } from 'react'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { useSlateStatic } from 'slate-react'
import { useDragBlock } from './use-drag-block'
import { useDropBlockOnEditor } from './use-drop-block-on-editor'

export const useDndBlock = ({
	id,
	blockRef,
	removePreview,
}: {
	id: string
	blockRef: any
	removePreview?: boolean
}) => {
	const editor = useSlateStatic()

	const [dropLine, setDropLine] = useState<null | 'top' | 'bottom'>(null)

	const [{ isDragging }, dragRef, preview] = useDragBlock(id)
	const [{ isOver }, drop] = useDropBlockOnEditor(editor, {
		id,
		blockRef,
		dropLine,
		setDropLine,
	})

	// TODO: previewElement option
	if (removePreview) {
		drop(blockRef)
		preview(getEmptyImage(), { captureDraggingState: true })
	} else {
		preview(drop(blockRef))
	}

	if (!isOver && dropLine) {
		setDropLine(null)
	}

	return {
		isDragging,
		dropLine,
		dragRef,
	}
}
