import React from 'react'
import { NextPage } from 'next'
import { EditorLayout } from '~/layouts/editor-layout'
import { withAuthSsr } from '~/apollo/utils/with-auth-ssr'
import { Cell, Grid } from 'baseui/layout-grid'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import {
	HeadingSmall,
	LabelMedium,
	HeadingXXLarge,
	HeadingXSmall,
} from 'baseui/typography'
import {
	borderColor,
	borderRadius,
	borderStyle,
	borderWidth,
	padding,
} from 'polished'
import OpenColor from 'open-color'
import { styled, useStyletron } from 'styletron-react'
import { useUser } from '~/modules/user/hooks/use-user'
import { Button } from 'baseui/button'
import {
	CheckDuplicatedSlugDocument,
	PagePartsFragment,
	UpdateGtagDocument,
	UpdateSlugDocument,
	UpdateTitleDocument,
} from '~/graphql/document.generated'
import { Controller, useForm } from 'react-hook-form'
import { Icon } from '~/components/icon'
import { useMutation } from '@apollo/client'
import debouncePromise from 'awesome-debounce-promise'
import { useSnackbar } from 'baseui/snackbar'

interface SettingsProps {
	page: PagePartsFragment
}

export const getServerSideProps = withAuthSsr<SettingsProps>(
	(_, user) => async () => {
		if (!user) {
			return {
				notFound: true,
			}
		}
		return {
			props: {
				page: user.page,
			},
		}
	}
)

const Settings: NextPage<SettingsProps> = ({ page }) => {
	const [css] = useStyletron()
	const { enqueue } = useSnackbar()
	const user = useUser()

	const { control: slugControl, handleSubmit: handleSlugSubmit } = useForm<{
		slug: string
	}>({
		mode: 'onChange',
		defaultValues: {
			slug: user?.page.slug ?? '',
		},
	})
	const [updateSlug, { loading: slugLoading }] = useMutation(
		UpdateSlugDocument,
		{
			onCompleted: () => {
				enqueue({
					message: 'Saved!',
					startEnhancer: () => (
						<Icon type="Verified" color={OpenColor.green[6]} size={24} />
					),
				})
			},
		}
	)
	const [checkDuplicatedSlug] = useMutation(CheckDuplicatedSlugDocument)

	const { control: titleControl, handleSubmit: handleTitleSubmit } = useForm<{
		title: string
	}>({
		mode: 'onChange',
		defaultValues: {
			title: user?.page.title ?? '',
		},
	})
	const [updateTitle, { loading: titleLoading }] = useMutation(
		UpdateTitleDocument,
		{
			onCompleted: () => {
				enqueue({
					message: 'Saved!',
					startEnhancer: () => (
						<Icon type="Verified" color={OpenColor.green[6]} size={24} />
					),
				})
			},
		}
	)

	const { control: gtagControl, handleSubmit: handleGtagSubmit } = useForm<{
		gtag: string
	}>({
		mode: 'onChange',
		defaultValues: {
			gtag: user?.page.gtag ?? '',
		},
	})
	const [updateGtag, { loading: gtagLoading }] = useMutation(
		UpdateGtagDocument,
		{
			onCompleted: () => {
				enqueue({
					message: 'Saved!',
					startEnhancer: () => (
						<Icon type="Verified" color={OpenColor.green[6]} size={24} />
					),
				})
			},
		}
	)

	return (
		<>
			<Grid>
				<Cell span={[4, 8, 8]} skip={[0, 0, 2]}>
					<HeadingXXLarge
						className={css({
							marginTop: '32px',
							marginBottom: '32px',
						})}
					>
						Settings
					</HeadingXXLarge>
					<Section title="My page link">
						<form
							onSubmit={handleSlugSubmit(async ({ slug }) => {
								if (user?.page.slug === slug) {
									return
								}
								await updateSlug({
									variables: {
										slug,
									},
								})
							})}
						>
							<Controller
								control={slugControl}
								name="slug"
								rules={{
									pattern: {
										value: /^[A-Za-z0-9\.]*$/,
										message: `링크는 문자, 숫자 및 마침표(".")만 포함할 수 있습니다.`,
									},
									validate: debouncePromise(async (value) => {
										if (value === user?.page.slug) {
											return true
										}
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
									<FormControl error={error?.message}>
										<Input
											onChange={onChange}
											onBlur={onBlur}
											inputRef={ref}
											value={value}
											error={Boolean(error)}
											placeholder="yourname"
											startEnhancer={() => (
												<LabelMedium color={OpenColor.gray[7]}>
													develofolio.com/
												</LabelMedium>
											)}
											endEnhancer={() => (
												<div>
													{value && user?.page.slug !== value && !error && (
														<Button
															type="submit"
															kind="primary"
															size="mini"
															isLoading={slugLoading}
														>
															Save
														</Button>
													)}
												</div>
											)}
											overrides={{
												StartEnhancer: {
													style: {
														...padding('0px'),
													},
												},
												Input: {
													style: {
														paddingLeft: '0px',
														color: OpenColor.gray[7],
														'::placeholder': {
															color: OpenColor.gray[5],
														},
													},
												},
											}}
										/>
									</FormControl>
								)}
							/>
						</form>
					</Section>
					<Hr />
					<Section title="Title" description="">
						<form
							onSubmit={handleTitleSubmit(async ({ title }) => {
								if (user?.page.title === title) {
									return
								}
								await updateTitle({
									variables: {
										title,
									},
								})
							})}
						>
							<Controller
								control={titleControl}
								name="title"
								render={({
									field: { onChange, onBlur, ref, value },
									fieldState: { error },
								}) => (
									<FormControl error={error}>
										<Input
											onChange={onChange}
											onBlur={onBlur}
											inputRef={ref}
											value={value}
											error={Boolean(error)}
											placeholder={`${user?.name} | DeveloFolio`}
											endEnhancer={() => (
												<div>
													{value && user?.page.title !== value && !error && (
														<Button
															type="submit"
															kind="primary"
															size="mini"
															isLoading={titleLoading}
														>
															Save
														</Button>
													)}
												</div>
											)}
											overrides={{
												Input: {
													style: {
														color: OpenColor.gray[7],
														'::placeholder': {
															color: OpenColor.gray[5],
														},
													},
												},
											}}
										/>
									</FormControl>
								)}
							/>
						</form>
					</Section>
					<Hr />
					<Section
						title="Google Analytics"
						description="Google Analytics 추적 코드를 추가하여 페이지 방문자 데이터를 Google Analytics 계정으로 보냅니다."
					>
						<form
							onSubmit={handleGtagSubmit(async ({ gtag }) => {
								if (user?.page.gtag === gtag) {
									return
								}
								await updateGtag({
									variables: {
										gtag,
									},
								})
							})}
						>
							<Controller
								control={gtagControl}
								name="gtag"
								rules={{
									pattern: {
										value: /^[A-Z][A-Z0-9]?-[A-Z0-9]{4,10}(?:\-[1-9]\d{0,3})?$/,
										message: '올바른 측정 ID 를 입력해주세요.',
									},
								}}
								render={({
									field: { onChange, onBlur, ref, value },
									fieldState: { error },
								}) => (
									<FormControl error={error?.message}>
										<Input
											onChange={onChange}
											onBlur={onBlur}
											inputRef={ref}
											value={value}
											error={Boolean(error)}
											endEnhancer={() => (
												<div>
													{value && user?.page.gtag !== value && !error && (
														<Button
															type="submit"
															kind="primary"
															size="mini"
															isLoading={gtagLoading}
														>
															Save
														</Button>
													)}
												</div>
											)}
											placeholder="UA-XXXXXXXX-X or G-XXXXXXXXXX"
											overrides={{
												Input: {
													style: {
														color: OpenColor.gray[7],
														'::placeholder': {
															color: OpenColor.gray[5],
														},
													},
												},
											}}
										/>
									</FormControl>
								)}
							/>
						</form>
					</Section>

					<div
						className={css({
							...borderStyle('solid'),
							...borderWidth('1px'),
							...borderColor(OpenColor.red[8]),
							...borderRadius('top', '16px'),
							...borderRadius('bottom', '16px'),
							backgroundColor: OpenColor.red[0],
							...padding('16px'),
							marginTop: '32px',
							marginBottom: '32px',
						})}
					>
						<HeadingXSmall
							className={css({
								marginTop: '0px',
								marginBottom: '16px',
							})}
							color={OpenColor.red[8]}
						>
							Delete account
						</HeadingXSmall>
						<LabelMedium
							color={OpenColor.gray[6]}
							className={css({
								marginBottom: '32px',
							})}
						>
							포트폴리오와 계정 정보를 완전히 삭제합니다.
						</LabelMedium>
						<Button
							kind="secondary"
							size="mini"
							overrides={{
								BaseButton: {
									style: {
										...borderStyle('solid'),
										...borderWidth('1px'),
										...borderColor(OpenColor.gray[4]),
										...borderRadius('top', '8px'),
										...borderRadius('bottom', '8px'),
										backgroundColor: OpenColor.gray[0],
										color: OpenColor.red[7],
										fontWeight: 'bold',
									},
								},
							}}
						>
							Delete your account
						</Button>
					</div>
				</Cell>
			</Grid>
		</>
	)
}

interface SectionProps {
	title: string
	description?: string
	children?: React.ReactNode
}
const Section = ({ title, description, children }: SectionProps) => {
	const [css] = useStyletron()

	return (
		<div
			className={css({
				paddingBottom: '32px',
			})}
		>
			<HeadingSmall
				className={css({
					marginBottom: '16px',
					marginTop: '16px',
				})}
			>
				{title}
			</HeadingSmall>
			{description && (
				<LabelMedium
					color={OpenColor.gray[6]}
					className={css({
						marginBottom: '32px',
					})}
				>
					{description}
				</LabelMedium>
			)}
			{children}
		</div>
	)
}

const Hr = styled('hr', {
	...borderStyle('none'),
	borderTopStyle: 'solid',
	borderTopWidth: '1px',
	borderTopColor: OpenColor.gray[2],
})

Settings.getLayout = (page) => <EditorLayout>{page}</EditorLayout>

export default Settings
