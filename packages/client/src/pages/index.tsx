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
import { Input } from 'baseui/input'
import { useStyletron } from 'baseui'
import { PrimaryButton } from '~/components/pimary-button'
import { borderStyle, padding } from 'polished'
import Link from 'next/link'
import LogoPickerGif from 'public/images/logo-picker.gif'
import UrlImage from 'public/images/url.png'
import ChatImage from 'public/images/chat.png'
import { FormControl } from 'baseui/form-control'
import { Controller, useForm } from 'react-hook-form'
import debouncePromise from 'awesome-debounce-promise'
import { useMutation } from '@apollo/client'
import { CheckDuplicatedSlugDocument } from '~/graphql/document.generated'
import { storage } from '~/utils/storage'
import { useRouter } from 'next/dist/client/router'
import { ROUTE_LOGIN } from '~/routes'

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
	const router = useRouter()

	const { control: slugControl, handleSubmit: handleSlugSubmit } = useForm<{
		slug: string
	}>({
		mode: 'onChange',
		defaultValues: {
			slug: '',
		},
	})
	const [checkDuplicatedSlug] = useMutation(CheckDuplicatedSlugDocument)

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
									예시 페이지
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
					<Image src={ChatImage} alt="나를 표현하는 링크" />
				</Cell>
				<Cell span={[4, 4, 5]} skip={[0, 0, 2]}>
					<HeadingLarge
						$style={{
							fontWeight: 'bold',
							wordBreak: 'keep-all',
							marginBottom: '16px',
						}}
					>
						당신을 공유하세요!
					</HeadingLarge>
					<LabelMedium color={OpenColor.gray[7]}>
						디벨로폴리오는 당신의 포트폴리오를 기반으로 멋진 미리보기 카드를
						제공합니다.{' '}
						<a
							href="https://ogp.me/"
							target="_blank"
							rel="noreferrer"
							className={css({
								color: OpenColor.blue[7],
								textDecoration: 'none',
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
					<form
						className={css({
							display: 'flex',
						})}
						onSubmit={handleSlugSubmit(async ({ slug }) => {
							storage.setItem('reservedSlug', slug)
							router.push(ROUTE_LOGIN)
						})}
					>
						<Controller
							control={slugControl}
							name="slug"
							rules={{
								pattern: {
									value: /^[A-Za-z0-9\.\-\_]*$/,
									message: `링크는 문자, 숫자 및 몇가지 특수문자(".-_")만 포함할 수 있습니다.`,
								},
								validate: debouncePromise(async (value) => {
									const { data } = await checkDuplicatedSlug({
										variables: {
											slug: value,
										},
									})

									if (data?.checkDuplicatedSlug) {
										return '이미 누군가 사용중입니다.'
									}
									return true
								}, 300),
							}}
							render={({
								field: { onChange, onBlur, ref, value },
								fieldState: { error },
							}) => (
								<FormControl
									caption={error?.message}
									overrides={{
										Caption: {
											style: {
												color: OpenColor.red[7],
											},
										},
									}}
								>
									<Input
										inputRef={ref}
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										startEnhancer={() => <>https://develofolio.com/</>}
										endEnhancer={() => (
											<PrimaryButton
												disabled={Boolean(error)}
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
													transitionProperty: 'box-shadow',
													transitionDuration: '0.2s',
													...($isFocused
														? {
																boxShadow: `0px 0px 0px 2px ${OpenColor.blue[7]}`,
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
								</FormControl>
							)}
						/>
					</form>
				</Cell>
			</Grid>
		</div>
	)
}

Home.getLayout = (page) => <BasicLayout>{page}</BasicLayout>

export default Home
