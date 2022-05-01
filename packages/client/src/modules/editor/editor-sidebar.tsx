import React from 'react'
import OpenColor from 'open-color'
import { useStyletron } from 'styletron-react'
import { useUser } from '../user/hooks/use-user'
import { Icon, IconType } from '~/components/icon'
import Link from 'next/link'
import { ROUTE_EDIT, ROUTE_EDIT_SETTINGS } from '~/routes'
import { LabelSmall } from 'baseui/typography'
import { useHover } from '~/hooks/use-hover'
import { borderRadius, borderStyle, padding, transitions } from 'polished'
import { useRouter } from 'next/dist/client/router'
import { useRecoilValue } from 'recoil'
import { saveState } from './editor.atoms'
import { StatefulPopover } from 'baseui/popover'
import { StatefulMenu } from 'baseui/menu'
import { useLogout } from '../user/hooks/use-logout'
import { DevelofolioImage } from '~/components/develofolio-image'

export const EditorSidebar = () => {
	const [css] = useStyletron()
	const user = useUser()
	const save = useRecoilValue(saveState)
	const [logout] = useLogout()

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
			<StatefulPopover
				content={() => (
					<StatefulMenu
						items={[{ label: '로그아웃' }]}
						onItemSelect={logout}
						overrides={{
							List: {
								style: {
									...borderRadius('top', '8px'),
									...borderRadius('bottom', '8px'),
									boxShadow: 'none',
								},
							},
						}}
					/>
				)}
				overrides={{
					Body: {
						style: {
							...borderRadius('top', '8px'),
							...borderRadius('bottom', '8px'),
						},
					},
					Inner: {
						style: {
							backgroundColor: 'transparent',
						},
					},
				}}
				placement="bottomLeft"
			>
				<button
					className={css({
						backgroundColor: 'transparent',
						...borderStyle('none'),
						cursor: 'pointer',
					})}
				>
					{user &&
						(user.avatar ? (
							<DevelofolioImage
								src={user.avatar}
								width="40px"
								height="40px"
								className={css({
									borderRadius: '50%',
								})}
								alt={user.name}
							/>
						) : (
							<LabelSmall color={OpenColor.gray[3]}>{user?.name}</LabelSmall>
						))}
				</button>
			</StatefulPopover>
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
				{save === 'SAVED' ? 'Saved!' : save === 'SAVING' ? 'Saving...' : ''}
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
