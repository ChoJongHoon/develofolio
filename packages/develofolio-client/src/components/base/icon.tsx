import OpenColor from 'open-color'
import Bold from 'public/icons/bold.svg'
import Code from 'public/icons/code.svg'
import Italic from 'public/icons/italic.svg'
import React, { useMemo } from 'react'
import cx from 'classnames'
import { css } from '@emotion/react'

const icons = {
	Bold,
	Code,
	Italic,
}

export type IconType = keyof typeof icons
export const iconList = Object.keys(icons)

export type IconProps = {
	type: IconType
	size?: number
	color?: string | [string, string]
	className?: string
	rotate?: number
	onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const Icon = React.memo(
	({
		type,
		size = 16,
		color = OpenColor.black,
		rotate,
		className,
		onClick,
	}: IconProps) => {
		const Component = useMemo(() => icons[type], [type])

		return (
			<div
				className={cx('icon', className)}
				onClick={onClick}
				css={wrapper({ fill: color, clickable: Boolean(onClick), rotate })}
			>
				<Component width={size} height={size} />
			</div>
		)
	}
)

type StyleProps = {
	fill: string | [string, string]
	rotate?: number
	clickable?: boolean
}

const wrapper = ({ fill, clickable, rotate }: StyleProps) => css`
	display: inline-flex;
	${rotate && `transform: rotate(${rotate}deg)`};
	${clickable && 'cursor: pointer;'};

	& > svg {
		${typeof fill === 'string'
			? css`
					fill: ${fill};
			  `
			: fill.map(
					(item, index) => css`
						& > *:nth-child(${index + 1}) {
							fill: ${item};
						}
					`
			  )}
	}
`
