import { css } from '@emotion/react'
import { CustomRenderElementProps, LogoElement } from '../custom-types'
import Image from 'next/image'

export const Logo = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<LogoElement>) => {
	return (
		<span {...attributes} contentEditable={false} css={wrapper}>
			<Image
				src={`/logos/${element.file}`}
				css={imgStyles}
				alt={element.name}
				layout="fill"
			/>
			{children}
		</span>
	)
}

const wrapper = css`
	display: inline-block;
	align-items: center;
	justify-content: center;
	position: relative;
`

const imgStyles = css`
	height: 1em;
	display: block;
`
