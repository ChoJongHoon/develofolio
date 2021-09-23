import { NextPage } from 'next'
import { useStyletron } from 'baseui'
import { HeadingXXLarge, LabelXSmall } from 'baseui/typography'
import OpenColor from 'open-color'
import { FC, useEffect, useState } from 'react'
import { Icon, IconType } from '~/components/icon'
import { margin, padding } from 'polished'
import { storage } from '~/utils/storage'
import { Cell, Grid } from 'baseui/layout-grid'

interface LoginCardProps {
	name: string
	color: string
	icon: IconType
	textColor: string
	text: string
	isRecent?: boolean
}

const LoginCard: FC<LoginCardProps> = ({
	name,
	color,
	icon,
	textColor,
	text,
	isRecent,
}) => {
	const [css] = useStyletron()

	return (
		<div>
			<a
				className={css({
					...padding('8px'),
					textAlign: 'center',
					textDecoration: 'none',
					fontWeight: 'bold',
					color: textColor,
					backgroundColor: color,
					borderRadius: '4px',
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
					display: 'flex',
					gap: '8px',
					justifyContent: 'center',
					alignItems: 'center',
				})}
				href={`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/${name}`}
				onClick={() => {
					storage.setItem('recentProvider', name)
				}}
			>
				<Icon type={icon} color={textColor} size={18} />
				{text} 시작하기
			</a>
			{isRecent && (
				<LabelXSmall
					$style={{ ...margin('4px', '', '') }}
					color={OpenColor.gray[6]}
				>
					최근 로그인 했어요!
				</LabelXSmall>
			)}
		</div>
	)
}

const PROVIDERS: Array<LoginCardProps> = [
	{
		name: 'github',
		color: '#24292D',
		icon: 'Github',
		textColor: '#FFFFFF',
		text: 'GitHub로',
	},
	{
		name: 'google',
		color: '#FFFFFF',
		icon: 'Google',
		textColor: '#444444',
		text: 'Google로',
	},
	{
		name: 'facebook',
		color: '#1A77F2',
		icon: 'Facebook',
		textColor: '#FFFFFF',
		text: 'Facebook으로',
	},
]

const LoginPage: NextPage = () => {
	const [css] = useStyletron()

	const [recentProvider, setRecentProvider] = useState<string | null>(null)

	useEffect(() => {
		setRecentProvider(storage.getItem('recentProvider'))
	}, [])

	return (
		<div
			className={css({
				height: '100vh',
				backgroundColor: OpenColor.gray[0],
			})}
		>
			<Grid
				overrides={{
					Grid: {
						style: {
							height: '100%',
						},
					},
				}}
			>
				<Cell
					span={[4, 8, 12]}
					overrides={{
						Cell: {
							style: {
								height: '100%',
							},
						},
					}}
				>
					<div
						className={css({
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							height: '100%',
						})}
					>
						<HeadingXXLarge
							overrides={{
								Block: {
									style: {
										fontWeight: 'bold',
									},
								},
							}}
							color={OpenColor.gray[8]}
						>
							시작하기
						</HeadingXXLarge>
						<div
							className={css({
								...padding('32px', ''),
								display: 'flex',
								flexDirection: 'column',
								gap: '16px',
								width: '100%',
								maxWidth: '320px',
							})}
						>
							{PROVIDERS.map((provider) => (
								<LoginCard
									key={provider.name}
									name={provider.name}
									color={provider.color}
									icon={provider.icon}
									textColor={provider.textColor}
									text={provider.text}
									isRecent={recentProvider === provider.name}
								/>
							))}
						</div>
						<LabelXSmall
							overrides={{
								Block: {
									style: {
										fontWeight: 'bold',
									},
								},
							}}
							color={OpenColor.gray[5]}
						>
							<span
								className={css({
									color: OpenColor.blue[7],
								})}
							>
								이용약관
							</span>
							,
							<span
								className={css({
									color: OpenColor.blue[7],
								})}
							>
								{' '}
								개인정보 수집 및 이용
							</span>{' '}
							내용을 확인하였고 동의합니다.
						</LabelXSmall>
					</div>
				</Cell>
			</Grid>
		</div>
	)
}

export default LoginPage
