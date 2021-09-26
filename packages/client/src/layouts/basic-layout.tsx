import React from 'react'
import { StyleObject, useStyletron } from 'styletron-react'
import Logo from 'public/images/logo.svg'
import { borderRadius, padding } from 'polished'
import OpenColor from 'open-color'
import { ParagraphXSmall } from 'baseui/typography'
import Link from 'next/link'
import { ROUTE_HOME, ROUTE_LOGIN } from '~/routes'
import { merge } from 'lodash'
import { PrimaryButton } from '~/components/pimary-button'

interface BasicLayoutOverrides {
	main?: {
		style?: StyleObject
	}
	header?: {
		style?: StyleObject
	}
}

interface BasicLayoutProps {
	children?: React.ReactNode
	overrides?: BasicLayoutOverrides
}

export const BasicLayout = ({ children, overrides }: BasicLayoutProps) => {
	const [css] = useStyletron()

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			})}
		>
			<header
				className={css(
					merge<StyleObject, StyleObject>(
						{
							...padding('16px'),
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						},
						overrides?.header?.style || {}
					)
				)}
			>
				<Link href={ROUTE_HOME}>
					<a>
						<Logo height="20px" />
					</a>
				</Link>
				<Link href={ROUTE_LOGIN} passHref>
					<PrimaryButton
						$as="a"
						size="compact"
						overrides={{
							BaseButton: {
								style: {
									...borderRadius('top', '8px'),
									...borderRadius('bottom', '8px'),
								},
							},
						}}
					>
						시작하기
					</PrimaryButton>
				</Link>
			</header>
			<main
				className={css(
					merge<StyleObject, StyleObject>(
						{
							flexGrow: 1,
							flexShrink: 1,
							position: 'relative',
						},
						overrides?.main?.style || {}
					)
				)}
			>
				{children}
			</main>
			<footer
				className={css({
					...padding('4px', '16px'),
					display: 'flex',
					justifyContent: 'center',
				})}
			>
				<ParagraphXSmall color={OpenColor.gray[6]}>footer</ParagraphXSmall>
			</footer>
		</div>
	)
}
