import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import { renderElement } from './elements'
import { withIcon } from './elements/icon'
import { withMarkdown } from './elements/markdown'

export function Editor() {
	const editor = useMemo(
		() => withReact(withHistory(withIcon(withMarkdown(createEditor())))),
		[]
	)

	const [value, setValue] = useState<Descendant[]>([
		{
			type: 'paragraph',
			children: [
				{ text: ' ' },
				{
					type: 'icon',
					name: 'React',
					shortname: 'react',
					url: 'https://facebook.github.io/react/',
					file: 'react.svg',
					children: [{ text: '' }],
				},
				{ text: ' ' },
			],
		},
	])

	const onChnage = useCallback(
		(newValue: Descendant[]) => setValue(newValue),
		[]
	)

	return (
		<Slate editor={editor} value={value} onChange={onChnage}>
			<Editable renderElement={renderElement} spellCheck={false} />
		</Slate>
	)
}
