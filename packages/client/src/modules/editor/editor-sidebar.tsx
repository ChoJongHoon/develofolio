import React from 'react'
import Image from 'next/image'
import OpenColor from 'open-color'
import { useStyletron } from 'styletron-react'
import { useUser } from '../user/hooks/use-user'
import { Icon, IconType } from '~/components/icon'
import Link from 'next/link'
import { ROUTE_EDIT, ROUTE_EDIT_SETTINGS } from '~/routes'
import { LabelSmall } from 'baseui/typography'
import { useHover } from '~/hooks/use-hover'
import { padding, transitions } from 'polished'
import { useRouter } from 'next/dist/client/router'
import { useSelector } from 'react-redux'

export const EditorSidebar = () => {
	const [css] = useStyletron()
	const user = useUser()
	const loading = useSelector((state) => state.editor.loading)
	const saved = useSelector((state) => state.editor.saved)
	const saving = useSelector((state) => state.editor.saving)

	return (
		<div
			className={css({
				backgroundColor: OpenColor.gray[8],
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				paddingTop: '16px',
				paddingBottom: '16px',
			})}
		>
			{user &&
				(user.avatar ? (
					<Image
						src={user.avatar}
						width="40px"
						height="40px"
						className={css({
							borderRadius: '50%',
						})}
						alt={user.name}
					/>
				) : (
					<span>{user?.name}</span>
				))}
			<nav
				className={css({
					flex: '1 1 0',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
					paddingTop: '32px',
					width: '100%',
				})}
			>
				<MenuItem name="Edit" icon="Pencil" href={ROUTE_EDIT} />
				<MenuItem name="Settings" icon="Setting" href={ROUTE_EDIT_SETTINGS} />
			</nav>
			<LabelSmall className={css({})} color={OpenColor.gray[5]}>
				{loading ? 'Loading...' : saving ? 'Saving...' : saved ? 'Saved!' : ''}
			</LabelSmall>
		</div>
	)
}

interface MenuItemProps {
	name: string
	icon: IconType
	href: string
}

const MenuItem = ({ href, icon, name }: MenuItemProps) => {
	const [css] = useStyletron()
	const [hoverRef, isHovered] = useHover<HTMLAnchorElement>()
	const router = useRouter()

	const isCurrent = router.pathname === href

	return (
		<Link href={href}>
			<a
				className={css({
					textDecoration: 'none',
					...transitions(['background-color'], '0.2s'),
					':hover': {
						backgroundColor: OpenColor.gray[7],
					},
				})}
				ref={hoverRef}
			>
				<div
					className={css({
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '4px',
						boxSizing: 'border-box',
						...padding('8px', '4px'),
					})}
				>
					<Icon
						type={icon}
						size={32}
						className={css({
							fill: isCurrent
								? OpenColor.gray[2]
								: isHovered
								? OpenColor.gray[4]
								: OpenColor.gray[6],
							...transitions(['fill'], '0.2s'),
						})}
					/>
					<LabelSmall
						className={css({ fontWeight: isCurrent ? 700 : 500 })}
						color={
							isCurrent
								? OpenColor.gray[2]
								: isHovered
								? OpenColor.gray[4]
								: OpenColor.gray[6]
						}
					>
						{name}
					</LabelSmall>
				</div>
			</a>
		</Link>
	)
}
