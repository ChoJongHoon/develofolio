import { useMemo } from 'react'
import { useSlate } from 'slate-react'
import { IconType } from '~/components/icon'
import { LeafFormat } from '../../custom-types'
import { ToolbarButton } from './toolbar-button'
import { isFormatActive, toggleFormat } from '../utils'

interface FormatButtonProps {
	format: LeafFormat
}

export const FormatButton = ({ format }: FormatButtonProps) => {
	const editor = useSlate()
	const isActive = isFormatActive(editor, format)
	const iconType = useMemo<IconType>(() => {
		switch (format) {
			case 'bold':
				return 'Bold'
			case 'italic':
				return 'Italic'
			case 'code':
				return 'Code'
		}
	}, [format])
	return (
		<ToolbarButton
			icon={iconType}
			isActive={isActive}
			onMouseDown={(event) => {
				event.preventDefault()
				toggleFormat(editor, format)
			}}
		/>
	)
}
