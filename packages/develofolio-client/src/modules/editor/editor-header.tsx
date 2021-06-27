import OpenColor from 'open-color'
import { border, padding } from 'polished'
import { useSelector } from 'react-redux'
import { useStyletron } from 'styletron-react'
import { StyleObject } from 'styletron-standard'
import { zIndexes } from '~/styles/z-indexes'

export const EditorHeader = () => {
	const [css] = useStyletron()
	const loading = useSelector((state) => state.editor.loading)
	const saved = useSelector((state) => state.editor.saved)
	const saving = useSelector((state) => state.editor.saving)

	return (
		<header className={css(rootStyles)}>
			<span className={css(editModeLabelStyles)}>Edit Mode</span>
			<span className={css(statusLabelStyles)}>
				{loading ? 'Loading...' : saving ? 'Saving...' : saved ? 'Saved!' : ''}
			</span>
		</header>
	)
}

const rootStyles: StyleObject = {
	backgroundColor: OpenColor.white,
	display: 'flex',
	...padding('8px', '16px'),
	position: 'sticky',
	top: '0px',
	alignItems: 'center',
	zIndex: zIndexes.header,
}

const editModeLabelStyles: StyleObject = {
	...border('1px', 'solid', OpenColor.red[7]),
	...padding('4px', '8px'),
	borderRadius: '24px',
	color: OpenColor.red[7],
	marginRight: '8px',
	fontWeight: 700,
}

const statusLabelStyles: StyleObject = {
	color: OpenColor.gray[4],
	fontWeight: 700,
}
