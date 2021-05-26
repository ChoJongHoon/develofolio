import React from 'react'
import { Editor } from '~/components/editor/editor'
import { EditorHeader } from '~/components/editor/editor-header'

export default function Edit() {
	return (
		<div>
			<EditorHeader />
			<Editor />
		</div>
	)
}
