import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React from 'react'
import { CustomRenderElementProps, SkillListElement } from '../custom-types'

export const SkillList = ({
	attributes,
	children,
}: CustomRenderElementProps<SkillListElement>) => {
	return <ul {...attributes}>{children}</ul>
}
