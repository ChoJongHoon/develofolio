import React, { useEffect, useRef } from 'react'
import { StyleObject, useStyletron } from 'styletron-react'
import Logo from 'public/images/logo.svg'
import { borderRadius, padding } from 'polished'
import OpenColor from 'open-color'
import { LabelXSmall, ParagraphXSmall } from 'baseui/typography'
import Link from 'next/link'
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_PRIVACY, ROUTE_TERMS } from '~/routes'
import { merge } from 'lodash'
import { PrimaryButton } from '~/components/pimary-button'
import { gsap } from 'gsap'
import { linkStyles } from '~/styles/styles'
import { Icon } from '~/components/icon'
import { useRouterLoading } from '~/hooks/use-router-loading'
import Head from 'next/head'

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

	const [loading] = useRouterLoading()

	const headerRef = useRef<HTMLDivElement>(null)
	const logoRef = useRef<SVGSVGElement>(null)

	useEffect(() => {
		if (!headerRef.current || !logoRef.current) return

		const tl = gsap
			.timeline({
				scrollTrigger: {
					start: 'top top',
					end: `+=120px`,
					scrub: 0.2,
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
		<>
			<Head>
				<meta property="og:url" content="https://develofolio.com" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content="DeveloFolio" />
				<meta
					property="og:description"
					content="디벨로폴리오 - 개발자들의 포트폴리오 에디터"
				/>
				<meta
					property="og:image"
					content="https://images.develofolio.com/og-image.png"
				/>
			</Head>
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
							isLoading={loading}
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
						...padding('16px', '32px'),
						display: 'flex',
						justifyContent: 'space-between',
						backgroundColor: OpenColor.gray[1],
					})}
				>
					<div className={css({ display: 'flex', alignItems: 'center' })}>
						<LabelXSmall
							color={OpenColor.gray[6]}
							className={css({
								marginRight: '16px',
							})}
						>
							©DeveloFolio
						</LabelXSmall>
						<Link href={ROUTE_TERMS} passHref>
							<LabelXSmall
								as="a"
								className={css({
									...linkStyles,
								})}
								color={OpenColor.gray[6]}
							>
								이용약관
							</LabelXSmall>
						</Link>
						<span
							className={css({
								display: 'block',
								width: '24px',
								textAlign: 'center',
								color: OpenColor.gray[6],
							})}
						>
							･
						</span>
						<Link href={ROUTE_PRIVACY} passHref>
							<LabelXSmall
								as="a"
								className={css({
									...linkStyles,
								})}
								color={OpenColor.gray[6]}
							>
								개인정보 처리방침
							</LabelXSmall>
						</Link>
					</div>
					<div>
						<a
							href="https://github.com/ChoJongHoon/develofolio"
							target="_blank"
							rel="noreferrer"
							className={css({
								cursor: 'pointer',
								opacity: 0.6,
								transitionProperty: 'opacity',
								transitionDuration: '0.2s',
								':hover': {
									opacity: 1,
								},
							})}
						>
							<Icon type="Github2" size={24} color={OpenColor.gray[8]} />
						</a>
					</div>
				</footer>
			</div>
		</>
	)
}
