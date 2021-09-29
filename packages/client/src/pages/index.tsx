import React from 'react'
import Image from 'next/image'
import { styletron } from '~/styles/styletron'
import OpenColor from 'open-color'
import { GetStaticProps, NextPage } from 'next'
import { BasicLayout } from '~/layouts/basic-layout'
import {
	DisplayMedium,
	HeadingLarge,
	LabelMedium,
	LabelXSmall,
} from 'baseui/typography'
import { ALIGNMENT, Cell, Grid } from 'baseui/layout-grid'
import ExampleImage from 'public/images/example.png'
import { AspectRatioBox, AspectRatioBoxBody } from 'baseui/aspect-ratio-box'
import { Input } from 'baseui/input'
import { useStyletron } from 'baseui'
import { PrimaryButton } from '~/components/pimary-button'
import { borderStyle, padding } from 'polished'
import Link from 'next/link'
import LogoPickerGif from 'public/images/logo-picker.gif'

export const getStaticProps: GetStaticProps = async () => {
	const bodyClassName = styletron.renderStyle({
		backgroundColor: OpenColor.gray[0],
	})

	return {
		props: { bodyClassName },
	}
}

const Home: NextPage = () => {
	const [css, theme] = useStyletron()

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
					<DisplayMedium
						$style={{ textAlign: 'center', fontWeight: 'bold' }}
						color={OpenColor.gray[8]}
					>
						개발자 포트폴리오
						<br />
						간편히 만들고 간단히 공유하세요.
					</DisplayMedium>
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
				<Cell span={[4, 8, 8]} skip={[0, 0, 2]}>
					<Link href="/example">
						<a
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
									예제 페이지
								</LabelXSmall>
							</figure>
						</a>
					</Link>
				</Cell>
			</Grid>
			<Grid
				align={ALIGNMENT.center}
				overrides={{
					Grid: {
						style: {
							marginBottom: '32px',
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
					<HeadingLarge
						$style={{
							fontWeight: 'bold',
							wordBreak: 'keep-all',
							marginBottom: '16px',
						}}
					>
						개발자 포트폴리오에 최적화된 에디터
					</HeadingLarge>
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
							marginBottom: '32px',
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
					<AspectRatioBox>
						<AspectRatioBoxBody
							$style={{
								backgroundColor: OpenColor.white,
							}}
						></AspectRatioBoxBody>
					</AspectRatioBox>
				</Cell>
				<Cell span={[4, 4, 5]}>
					<HeadingLarge
						$style={{
							fontWeight: 'bold',
							wordBreak: 'keep-all',
							marginBottom: '16px',
						}}
					>
						나를 표현하는 링크
					</HeadingLarge>
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
					<AspectRatioBox>
						<AspectRatioBoxBody
							$style={{
								backgroundColor: OpenColor.white,
							}}
						></AspectRatioBoxBody>
					</AspectRatioBox>
				</Cell>
				<Cell span={[4, 4, 5]} skip={[0, 0, 2]}>
					<HeadingLarge
						$style={{
							fontWeight: 'bold',
							wordBreak: 'keep-all',
							marginBottom: '16px',
						}}
					>
						개발자 포트폴리오에 최적화된 에디터
					</HeadingLarge>
					<LabelMedium color={OpenColor.gray[7]}>
						아이콘을 이용해 직관적인 포트폴리오를 만드세요!
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
					<div
						className={css({
							display: 'flex',
						})}
					>
						<Input
							startEnhancer={() => <>https://develofolio.com/</>}
							endEnhancer={() => (
								<PrimaryButton
									overrides={{
										BaseButton: {
											style: {
												whiteSpace: 'nowrap',
											},
										},
									}}
								>
									시작하기
								</PrimaryButton>
							)}
							overrides={{
								Root: {
									style: ({ $isFocused }) => ({
										paddingRight: '0px',
										...borderStyle('none'),
										...($isFocused
											? {
													outlineStyle: 'solid',
													outlineWidth: '2px',
													outlineColor: OpenColor.blue[7],
													backgroundColor: OpenColor.gray[0],
											  }
											: {
													backgroundColor: OpenColor.gray[2],
											  }),
									}),
								},
								StartEnhancer: {
									style: {
										color: OpenColor.gray[6],
										paddingRight: '0px',
										backgroundColor: 'transparent',
									},
								},
								EndEnhancer: {
									style: {
										...padding('0px'),
										alignItems: 'stretch',
									},
								},
								InputContainer: {
									style: {
										backgroundColor: 'transparent',
									},
								},
								Input: {
									style: {
										paddingLeft: '2px',
										backgroundColor: 'transparent',
										'::placeholder': {
											color: OpenColor.gray[6],
										},
									},
								},
							}}
							placeholder="your-name"
							size="large"
						/>
					</div>
				</Cell>
			</Grid>
		</div>
	)
}

Home.getLayout = (page) => <BasicLayout>{page}</BasicLayout>

export default Home
