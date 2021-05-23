import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React from 'react'
import { Element } from 'slate'
import { CustomRenderElementProps, HeadingElement } from '../custom-types'

export const isHeading = (
	element: Partial<Element>
): element is HeadingElement => element.type === 'heading'

export const Heading = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<HeadingElement>) => {
	const CustomTag = `h${element.level}` as const
	return (
		<CustomTag
			{...attributes}
			css={
				element.level === 1
					? h1Styles
					: element.level === 2
					? h2Styles
					: h3Styles
			}
		>
			{element.level === 1 && (
				<span css={beforeStyles} contentEditable={false} />
			)}
			{children}
		</CustomTag>
	)
}

const h1Styles = css`
	font-size: 30px;
	line-height: 1.5;
	margin-top: 2em;
`

const h2Styles = css`
	font-size: 24px;
	line-height: 1.3;
	margin-top: 1.4em;
`

const h3Styles = css`
	font-size: 20px;
	line-height: 1.2;
	margin-top: 1em;
`

const beforeStyles = css`
	user-select: none;
	display: inline-block;
	width: 4px;
	height: 45px;
	background-color: ${OpenColor.teal[6]};
	margin-right: 16px;
`
