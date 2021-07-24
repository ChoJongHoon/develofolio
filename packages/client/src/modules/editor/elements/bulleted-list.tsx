import { useStyletron } from 'styletron-react'
import { StyleObject } from 'styletron-standard'
import { BulletedListElement, CustomRenderElementProps } from '../custom-types'

export const BulletedList = ({
	attributes,
	children,
}: CustomRenderElementProps<BulletedListElement>) => {
	const [css] = useStyletron()
	return (
		<ul {...attributes} className={css(styles)}>
			{children}
		</ul>
	)
}

const styles: StyleObject = {
	listStyle: 'none',
}
