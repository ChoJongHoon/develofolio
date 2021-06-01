import React, { useMemo } from 'react'
import cx from 'classnames'
import { css } from '@emotion/react'
import OpenColor from 'open-color'
// Icons
import Bold from 'public/icons/bold.svg'
import Code from 'public/icons/code.svg'
import Italic from 'public/icons/italic.svg'
import DragHandle from 'public/icons/drag-handle.svg'
import Facebook from 'public/icons/facebook.svg'
import Github from 'public/icons/github.svg'
import StackOverflow from 'public/icons/stack-overflow.svg'
import Twitter from 'public/icons/twitter.svg'
import X from 'public/icons/x.svg'
import UserAddOutlined from 'public/icons/user-add-outlined.svg'
import TrashLine from 'public/icons/trash-line.svg'
import Plus from 'public/icons/plus.svg'
import Pencil from 'public/icons/pencil.svg'

const icons = {
	Bold,
	Code,
	Italic,
	DragHandle,
	Facebook,
	Github,
	StackOverflow,
	Twitter,
	X,
	UserAddOutlined,
	TrashLine,
	Plus,
	Pencil,
}

export type IconType = keyof typeof icons
export const iconList = Object.keys(icons)

export type IconProps = {
	type: IconType
	size?: number
	color?: string | [string, string]
	className?: string
	rotate?: number
	onClick?: React.MouseEventHandler<SVGSVGElement>
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
			<Component
				width={size}
				height={size}
				className={cx('icon', className)}
				onClick={onClick}
				css={wrapper({ fill: color, clickable: Boolean(onClick), rotate })}
			/>
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
`
