import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

export function Editor() {
	const editor = useMemo(() => withReact(withHistory(createEditor())), [])

	const [value, setValue] = useState<Descendant[]>([
		{
			type: 'paragraph',
			children: [{ text: '' }],
		},
	])

	const onChnage = useCallback(
		(newValue: Descendant[]) => setValue(newValue),
		[]
	)

	return (
		<Slate editor={editor} value={value} onChange={onChnage}>
			<Editable placeholder="placeholder..." />
		</Slate>
	)
}
