import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React from 'react'
import {
	CustomRenderElementProps,
	SkillListItemLogosElement,
	SkillListItemNameElement,
} from '../custom-types'

export const SkillListItemName = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListItemNameElement>) => {
	return <h3 {...attributes}>{children}</h3>
}
