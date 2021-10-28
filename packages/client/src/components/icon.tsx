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
import Github2 from 'public/icons/github2.svg'
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
import Image from 'public/icons/image.svg'
import Check from 'public/icons/check.svg'
import Verified from 'public/icons/verified.svg'
import Google from 'public/icons/google.svg'
import GithubCircle from 'public/icons/github-circle.svg'
import VelogCircle from 'public/icons/velog-circle.svg'
import LinkedinCircle from 'public/icons/linkedin-circle.svg'
import StackoverflowCircle from 'public/icons/stackoverflow-circle.svg'
import FacebookCircle from 'public/icons/facebook-circle.svg'
import TwitterCircle from 'public/icons/twitter-circle.svg'
import YoutubeCircle from 'public/icons/youtube-circle.svg'
import Apple from 'public/icons/apple.svg'
import Android from 'public/icons/android.svg'

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
	Github2,
	Google,
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
	Image,
	Check,
	Verified,
	GithubCircle,
	VelogCircle,
	LinkedinCircle,
	StackoverflowCircle,
	FacebookCircle,
	TwitterCircle,
	YoutubeCircle,
	Apple,
	Android,
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
