import React, { useEffect, useRef } from 'react'
import { StyleObject, useStyletron } from 'styletron-react'
import Logo from 'public/images/logo.svg'
import { borderRadius, padding } from 'polished'
import OpenColor from 'open-color'
import { ParagraphXSmall } from 'baseui/typography'
import Link from 'next/link'
import { ROUTE_HOME, ROUTE_LOGIN } from '~/routes'
import { merge } from 'lodash'
import { PrimaryButton } from '~/components/pimary-button'
import { gsap } from 'gsap'

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
	const headerRef = useRef<HTMLDivElement>(null)
	const logoRef = useRef<SVGSVGElement>(null)

	useEffect(() => {
		if (!headerRef.current || !logoRef.current) return

		const tl = gsap
			.timeline({
				scrollTrigger: {
					start: 'top top',
					end: `+=120px`,
					scrub: true,
				},
			})
			.to(headerRef.current, {
				backgroundColor: 'rgba(255,255,255,1)',
				paddingTop: '8px',
				paddingBottom: '8px',
				ease: 'none',
				boxShadow: '0px 20px 40px 0px rgba(0,0,0,0.08)',
			})
			.to(
				logoRef.current,
				{
					scale: 1,
				},
				'<'
			)

		return () => {
			tl.kill()
		}
	}, [])

	return (
		<div
			className={css({
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh',
			})}
		>
			<header
				ref={headerRef}
				className={css(
					merge<StyleObject, StyleObject>(
						{
							...padding('16px'),
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							position: 'sticky',
							top: '0px',
							zIndex: 100,
							backgroundColor: 'rgba(255,255,255,0)',
							boxShadow: '0px 20px 40px 0px rgba(0,0,0,0)',
						},
						overrides?.header?.style || {}
					)
				)}
			>
				<Link href={ROUTE_HOME}>
					<a>
						<Logo
							ref={logoRef}
							className={css({
								height: '16px',
								transform: 'scale(1.25)',
								transformOrigin: 'left center',
							})}
						/>
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
