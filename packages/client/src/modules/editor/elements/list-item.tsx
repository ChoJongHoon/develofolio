import { useStyletron } from 'styletron-react'
import { StyleObject } from 'styletron-standard'
import { CustomRenderElementProps, ListItemElement } from '../custom-types'

export const ListItem = ({
	attributes,
	children,
}: CustomRenderElementProps<ListItemElement>) => {
	const [css] = useStyletron()
	return (
		<li {...attributes} className={css(rootStyles)}>
			<div className={css(bulletStyles)} contentEditable={false}>
				•
			</div>
			{children}
		</li>
	)
}

const rootStyles: StyleObject = {
	display: 'flex',
	alignItems: 'center',
	paddingLeft: '2px',
	fontSize: '16px',
	lineHeight: 1.5,
}

const bulletStyles: StyleObject = {
	marginRight: '2px',
	width: '24px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '24px',
	lineHeight: 1,
	marginBottom: '0.1em',
}
