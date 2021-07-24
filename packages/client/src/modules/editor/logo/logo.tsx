import { CustomRenderElementProps, LogoElement } from '../custom-types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { StyleObject, useStyletron } from 'styletron-react'

export const Logo = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<LogoElement>) => {
	const [css] = useStyletron()

	return (
		<span {...attributes} contentEditable={false} className={css(wrapper)}>
			<img src={`/logos/${element.file}`} css={imgStyles} alt={element.name} />
			{children}
		</span>
	)
}

const wrapper: StyleObject = {
	display: 'inline-block',
	alignItems: 'center',
	justifyContent: 'center',
	position: 'relative',
}

const imgStyles: StyleObject = {
	height: '1em',
	display: 'block',
}
