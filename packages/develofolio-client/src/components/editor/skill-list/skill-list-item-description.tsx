import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React from 'react'
import {
	CustomRenderElementProps,
	SkillListItemDescriptionElement,
} from '../custom-types'

export const SkillListItemDescription = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListItemDescriptionElement>) => {
	return <p {...attributes}>{children}</p>
}
