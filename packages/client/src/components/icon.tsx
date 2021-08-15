import React, { useMemo } from 'react'
import cx from 'classnames'
import { useStyletron } from 'styletron-react'

// Icons
import Bold from 'public/icons/bold.svg'
import Code from 'public/icons/code.svg'
import Italic from 'public/icons/italic.svg'
import FontColor from 'public/icons/font-color.svg'
import Highlight from 'public/icons/highlight.svg'
import Link from 'public/icons/link.svg'
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
import Setting from 'public/icons/setting.svg'
import Web from 'public/icons/web.svg'
import Playstore from 'public/icons/playstore.svg'
import Appstore from 'public/icons/appstore.svg'

const icons = {
	Bold,
	Code,
	Italic,
	FontColor,
	Highlight,
	Link,
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
	Setting,
	Web,
	Playstore,
	Appstore,
}

export type IconType = keyof typeof icons
export const iconList = Object.keys(icons)

export type IconProps = {
	type: IconType
	size?: number
	color?: string
	className?: string
	rotate?: number
	onClick?: React.MouseEventHandler<SVGSVGElement>
}

export const Icon = React.memo(
	({ type, size, color, rotate, className, onClick }: IconProps) => {
		const [css] = useStyletron()
		const Component = useMemo(() => icons[type], [type])

		return (
			<Component
				width={size}
				height={size}
				className={cx(
					'icon',
					className,
					css({
						display: 'inline-flex',
						transform: rotate ? `rotate(${rotate}deg)` : undefined,
						cursor: Boolean(onClick) ? 'pointer' : undefined,
						fill: color,
					})
				)}
				onClick={onClick}
			/>
		)
	}
)
