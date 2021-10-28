import React from 'react'
import Image from 'next/image'
import { styletron } from '~/styles/styletron'
import OpenColor from 'open-color'
import { GetStaticProps, NextPage } from 'next'
import { BasicLayout } from '~/layouts/basic-layout'
import {
	DisplayXSmall,
	HeadingLarge,
	HeadingMedium,
	LabelMedium,
	LabelXSmall,
} from 'baseui/typography'
import { ALIGNMENT, Cell, Grid } from 'baseui/layout-grid'
import ExampleImage from 'public/images/example.png'
import { useStyletron } from 'baseui'
import LogoPickerGif from 'public/images/logo-picker.gif'
import UrlImage from 'public/images/url.png'
import ChatImage from 'public/images/chat.png'
import { storage } from '~/utils/storage'
import { useRouter } from 'next/dist/client/router'
import { ROUTE_LOGIN } from '~/routes'
import { linkStyles } from '~/styles/styles'
import { LinkInput } from '~/components/link-input'
import { useRouterLoading } from '~/hooks/use-router-loading'

export const getStaticProps: GetStaticProps = async () => {
	const bodyClassName = styletron.renderStyle({
		backgroundColor: OpenColor.gray[0],
	})

	return {
		props: { bodyClassName },
	}
}

const IndexPage: NextPage = () => {
	const [css, theme] = useStyletron()
	const router = useRouter()
	const [loading] = useRouterLoading()

	return (
		<div>
			<Grid
				overrides={{
					Grid: {
						style: {
							marginTop: '48px',
							marginBottom: '32px',
						},
					},
				}}
			>
				<Cell span={[4, 8, 8]} skip={[0, 0, 2]}>
					<DisplayXSmall
						$style={{ textAlign: 'center', fontWeight: 'bold' }}
						color={OpenColor.gray[9]}
					>
						개발자 포트폴리오
						<br />
						간편히 만들고 간단히 공유하세요.
					</DisplayXSmall>
				</Cell>
			</Grid>
			<Grid
				overrides={{
					Grid: {
						style: {
							marginBottom: '64px',
						},
					},
				}}
			>
				<Cell span={[4, 6, 8]} skip={[0, 1, 2]}>
					<a
						href="https://example.develofolio.com"
						target="_blank"
						rel="noreferrer"
						className={css({
							textDecoration: 'none',
						})}
					>
						<figure>
							<Image src={ExampleImage} alt="Example" placeholder="blur" />
							<LabelXSmall
								as="figcaption"
								color={OpenColor.gray[5]}
								$style={{ textAlign: 'center' }}
							>
								예시 페이지
							</LabelXSmall>
						</figure>
					</a>
				</Cell>
			</Grid>
			<Grid
				align={ALIGNMENT.center}
				overrides={{
					Grid: {
						style: {
							marginBottom: '64px',
						},
					},
				}}
			>
				<Cell
					span={[4, 4, 5]}
					overrides={{
						Cell: {
							style: {
								marginBottom: '16px',
								[theme.mediaQuery.small]: {
									marginBottom: '16px',
								},
							},
						},
					}}
				>
					<Image src={LogoPickerGif} alt="로고 작성" />
				</Cell>
				<Cell span={[4, 4, 5]} skip={[0, 0, 2]}>
					<HeadingMedium
						color={OpenColor.gray[9]}
						$style={{
							fontWeight: 'bold',
							wordBreak: 'keep-all',
							marginBottom: '16px',
						}}
					>
						개발자 포트폴리오에 최적화된 에디터
					</HeadingMedium>
					<LabelMedium color={OpenColor.gray[7]}>
						<strong>{`Colon (:)`}</strong>
						{` 을 이용하여 포트롤리오 어디에서든 아이콘을 삽입할 수 있습니다.`}
					</LabelMedium>
					<LabelMedium color={OpenColor.gray[7]}>
						아이콘을 이용해 직관적인 포트폴리오를 만들어보세요.
					</LabelMedium>
				</Cell>
			</Grid>
			<Grid
				align={ALIGNMENT.center}
				overrides={{
					Grid: {
						style: {
							marginBottom: '64px',
							[theme.mediaQuery.medium]: {
								flexDirection: 'row-reverse',
							},
						},
					},
				}}
			>
				<Cell
					span={[4, 4, 5]}
					skip={[0, 0, 2]}
					overrides={{
						Cell: {
							style: {
								marginBottom: '16px',
								[theme.mediaQuery.small]: {
									marginBottom: '16px',
								},
							},
						},
					}}
				>
					<Image src={UrlImage} alt="나를 표현하는 링크" />
				</Cell>
				<Cell span={[4, 4, 5]}>
					<HeadingMedium
						color={OpenColor.gray[9]}
						$style={{
							fontWeight: 'bold',
							wordBreak: 'keep-all',
							marginBottom: '16px',
						}}
					>
						나를 표현하는 링크
					</HeadingMedium>
					<LabelMedium color={OpenColor.gray[7]}>
						클릭하기 싫어지는 복잡한 주소는 이제 그만! 나만의 주소를 미리
						선점하세요.
					</LabelMedium>
				</Cell>
			</Grid>
			<Grid
				align={ALIGNMENT.center}
				overrides={{
					Grid: {
						style: {
							marginBottom: '96px',
						},
					},
				}}
			>
				<Cell
					span={[4, 4, 5]}
					overrides={{
						Cell: {
							style: {
								marginBottom: '16px',
								[theme.mediaQuery.small]: {
									marginBottom: '16px',
								},
							},
						},
					}}
				>
					<Image src={ChatImage} alt="나를 표현하는 링크" />
				</Cell>
				<Cell span={[4, 4, 5]} skip={[0, 0, 2]}>
					<HeadingMedium
						color={OpenColor.gray[9]}
						$style={{
							fontWeight: 'bold',
							wordBreak: 'keep-all',
							marginBottom: '16px',
						}}
					>
						당신을 공유하세요!
					</HeadingMedium>
					<LabelMedium color={OpenColor.gray[7]}>
						디벨로폴리오는 당신의 포트폴리오를 기반으로 멋진 미리보기 카드를
						제공합니다.{' '}
						<a
							href="https://ogp.me/"
							target="_blank"
							rel="noreferrer"
							className={css({
								color: OpenColor.blue[7],
								...linkStyles,
							})}
						>{`(Open Graph)`}</a>
					</LabelMedium>
				</Cell>
			</Grid>
			<Grid
				overrides={{
					Grid: {
						style: {
							marginBottom: '32px',
						},
					},
				}}
			>
				<Cell span={[4, 8, 8]} skip={[0, 0, 2]}>
					<HeadingLarge
						$style={{ textAlign: 'center', fontWeight: 'bold' }}
						color={OpenColor.gray[9]}
					>
						지금 나만의 링크를 만드세요!
					</HeadingLarge>
				</Cell>
			</Grid>
			<Grid
				overrides={{
					Grid: {
						style: {
							marginBottom: '96px',
						},
					},
				}}
			>
				<Cell span={[4, 8, 8]} skip={[0, 0, 2]}>
					<LinkInput
						onSubmit={(slug) => {
							storage.setItem('reservedSlug', slug)
							router.push(ROUTE_LOGIN)
						}}
						overrides={{
							submit: {
								isLoading: loading,
							},
						}}
					/>
				</Cell>
			</Grid>
		</div>
	)
}

IndexPage.getLayout = (page) => <BasicLayout>{page}</BasicLayout>

export default IndexPage
