import React from 'react'
import { css } from '@emotion/react'
import { BulletedListElement, CustomRenderElementProps } from '../slate'

export const BulletedList = ({
	attributes,
	children,
}: CustomRenderElementProps<BulletedListElement>) => {
	return (
		<ul {...attributes} css={styles}>
			{children}
		</ul>
	)
}

const styles = css`
	list-style: none;
`
