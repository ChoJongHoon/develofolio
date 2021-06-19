import { css } from '@emotion/react'
import React from 'react'
import { CustomRenderElementProps, SkillListItemElement } from '../custom-types'

export const SkillListItem = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListItemElement>) => {
	return (
		<li {...attributes} css={styles}>
			{children}
		</li>
	)
}

const styles = css`
	list-style: none;
`
