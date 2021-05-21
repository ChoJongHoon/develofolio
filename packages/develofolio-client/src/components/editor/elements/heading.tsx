import React from 'react'
import { Element } from 'slate'
import { CustomRenderElementProps, HeadingElement } from '../slate'

export const isHeading = (
	element: Partial<Element>
): element is HeadingElement => element.type === 'heading'

export const Heading = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<HeadingElement>) => {
	const CustomTag = `h${element.level}` as const
	return <CustomTag {...attributes}>{children}</CustomTag>
}
