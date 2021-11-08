import { useStyletron } from 'styletron-react'
import { CustomRenderElementProps, ListItemElement } from '../custom-types'

export const ListItem = ({
	attributes,
	children,
}: CustomRenderElementProps<ListItemElement>) => {
	const [css] = useStyletron()
	return (
		<li
			{...attributes}
			className={css({
				display: 'flex',
				alignItems: 'flex-start',
				paddingLeft: '2px',
				fontSize: '16px',
				lineHeight: 1.5,
			})}
		>
			<div
				className={css({
					flexGrow: 0,
					flexShrink: 0,
					flexBasis: 'auto',
					marginRight: '2px',
					width: '24px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					fontSize: '24px',
					lineHeight: 1,
					marginBottom: '0.1em',
				})}
				contentEditable={false}
			>
				•
			</div>
			{children}
		</li>
	)
}
