import { css } from '@emotion/react'
import OpenColor from 'open-color'
import { useSelector } from 'react-redux'
import { zIndexes } from '~/styles/z-indexes'

export const EditorHeader = () => {
	const loading = useSelector((state) => state.editor.loading)
	const saved = useSelector((state) => state.editor.saved)
	const saving = useSelector((state) => state.editor.saving)

	return (
		<header css={rootStyles}>
			<span css={editModeLabelStyles}>Edit Mode</span>
			<span css={statusLabelStyles}>
				{loading ? 'Loading...' : saving ? 'Saving...' : saved ? 'Saved!' : ''}
			</span>
		</header>
	)
}

const rootStyles = css`
	background-color: white;
	display: flex;
	padding: 8px 16px;
	position: sticky;
	top: 0px;
	align-items: center;
	z-index: ${zIndexes.header};
`

const editModeLabelStyles = css`
	border: solid 1px ${OpenColor.red[7]};
	padding: 4px 8px;
	border-radius: 24px;
	color: ${OpenColor.red[7]};
	margin-right: 8px;
	font-weight: 700;
`

const statusLabelStyles = css`
	color: ${OpenColor.gray[4]};
	font-weight: 700;
`
