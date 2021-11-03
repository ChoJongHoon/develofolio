import OpenColor from 'open-color'
import { borderRadius, borderStyle, borderWidth, padding } from 'polished'
import { useStyletron } from 'styletron-react'
import { PrimaryButton } from './pimary-button'
import { useMutation } from '@apollo/client'
import { CheckDuplicatedSlugDocument } from '~/graphql/document.generated'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LabelSmall } from 'baseui/typography'
import { useAsync } from 'react-use'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import { Tooltip } from 'baseui/tooltip'
import { Icon } from './icon'
import * as clipboard from 'clipboard-polyfill/text'

interface LinkInputOverrides {
	submit?: {
		isLoading?: boolean
		text?: string
	}
}

interface LinkInputProps {
	onSubmit: (slug: string) => void | Promise<void>
	overrides?: LinkInputOverrides
	defaultValue?: string
}

export const LinkInput = ({
	onSubmit,
	overrides = {},
	defaultValue = '',
}: LinkInputProps) => {
	const [css] = useStyletron()

	const [value, setValue] = useState(defaultValue)
	const [isFocused, setIsFocused] = useState(false)
	const [isInvalidFormat, setIsInvalidFormat] = useState(false)
	const [isTaken, setIsTaken] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const sizeRef = useRef<HTMLInputElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)

	const [checkTaken] = useMutation(CheckDuplicatedSlugDocument)

	useEffect(() => {
		if (!sizeRef.current || !inputRef.current) return
		sizeRef.current.textContent = value || 'my-name'
		inputRef.current.style.width = `${
			sizeRef.current.getBoundingClientRect().width
		}px`
	}, [value])

	useEffect(() => {
		if (value) {
			setIsInvalidFormat(!/^[A-Za-z0-9\-\_]*$/.test(value))
		} else {
			setIsInvalidFormat(false)
		}
	}, [value])

	const debouncedCheckTaken = useMemo(
		() =>
			AwesomeDebouncePromise(async (slug: string) => {
				if (slug !== defaultValue) {
					const { data } = await checkTaken({
						variables: {
							slug,
						},
					})
					return Boolean(data?.checkDuplicatedSlug)
				}
				return false
			}, 300),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[defaultValue]
	)
	useAsync(async () => {
		const isTaken = await debouncedCheckTaken(value)
		setIsTaken(isTaken)
	}, [value])

	return (
		<div>
			<form
				className={css({
					display: 'flex',
					alignItems: 'center',
					transitionProperty: 'box-shadow',
					transitionDuration: '0.2s',
					...(isFocused
						? {
								boxShadow: `0px 0px 0px 2px ${OpenColor.blue[7]}`,
								backgroundColor: OpenColor.gray[0],
						  }
						: {
								backgroundColor: OpenColor.gray[2],
						  }),
				})}
				onSubmit={async (event) => {
					event.preventDefault()
					setIsLoading(true)
					await onSubmit(value)
					setIsLoading(false)
				}}
			>
				<label
					className={css({
						display: 'flex',
						fontSize: '18px',
						color: OpenColor.gray[5],
						flexGrow: 1,
						flexShrink: 1,
						height: '100%',
						...padding('14px'),
						cursor: 'text',
					})}
				>
					<div
						ref={sizeRef}
						className={css({
							...padding('0px'),
							position: 'absolute',
							height: '0px',
							overflow: 'hidden',
							whiteSpace: 'pre',
						})}
					/>
					<span>https://</span>
					<input
						className={css({
							...padding('0px'),
							...borderStyle('none'),
							...borderWidth('0px'),
							backgroundColor: 'transparent',
							color: OpenColor.gray[8],
							'::placeholder': {
								color: OpenColor.gray[5],
							},
							':focus': {
								outline: 'none',
							},
						})}
						ref={inputRef}
						value={value}
						spellCheck={false}
						placeholder="my-name"
						onChange={(event) => {
							setValue(event.currentTarget.value)
						}}
						onFocus={() => {
							setIsFocused(true)
						}}
						onBlur={() => {
							setIsFocused(false)
						}}
					/>
					<span>.develofolio.com</span>
				</label>
				{value && value === defaultValue && <CopyButton slug={value} />}
				<PrimaryButton
					disabled={isTaken || isInvalidFormat || value === defaultValue}
					overrides={{
						BaseButton: {
							style: {
								whiteSpace: 'nowrap',
							},
						},
					}}
					isLoading={overrides.submit?.isLoading ?? isLoading}
					type="submit"
				>
					{overrides.submit?.text ?? '시작하기'}
				</PrimaryButton>
			</form>
			<LabelSmall $style={{ marginTop: '4px' }} color={OpenColor.red[7]}>
				{isInvalidFormat
					? '링크는 문자, 숫자 및 몇가지 특수문자("-_")만 포함할 수 있습니다.'
					: isTaken
					? '이미 누군가 사용중입니다.'
					: ''}
			</LabelSmall>
		</div>
	)
}

interface CopyButtonProps {
	slug: string
}

const CopyButton = ({ slug }: CopyButtonProps) => {
	const [css] = useStyletron()
	const [isCopied, setIsCopied] = useState(false)

	const timeout = useRef<NodeJS.Timeout | null>(null)

	const onCopy = useCallback(async () => {
		await clipboard.writeText(`https://${slug}.develofolio.com`)

		if (timeout.current) {
			clearTimeout(timeout.current)
		}
		setIsCopied(true)
		timeout.current = setTimeout(() => {
			timeout.current = null
			setIsCopied(false)
		}, 2000)
	}, [slug])

	return (
		<Tooltip
			content={() => (
				<div
					className={css({
						display: 'flex',
						alignItems: 'center',
					})}
				>
					<Icon
						type="Verified"
						size={20}
						color={OpenColor.green[6]}
						className={css({ marginRight: '8px' })}
					/>
					<LabelSmall color={OpenColor.gray[0]}>Copied!</LabelSmall>
				</div>
			)}
			isOpen={isCopied}
			placement="bottom"
			showArrow
			accessibilityType={'tooltip'}
			overrides={{
				Body: {
					style: {
						...borderRadius('left', '4px'),
						...borderRadius('right', '4px'),
					},
				},
				Inner: {
					style: {
						...borderRadius('left', '4px'),
						...borderRadius('right', '4px'),
						...padding('6px', '8px'),
					},
				},
			}}
		>
			<button
				className={css({
					display: 'flex',
					...borderStyle('none'),
					backgroundColor: 'transparent',
					...padding('6px'),
					cursor: 'pointer',
					...borderRadius('left', '50%'),
					...borderRadius('right', '50%'),
					transitionProperty: 'background-color',
					transitionDuration: '0.2s',
					marginRight: '8px',
					':hover': {
						backgroundColor: OpenColor.gray[3],
					},
				})}
				onClick={onCopy}
				type="button"
			>
				<Icon type="Copy" size={20} color={OpenColor.gray[7]} />
			</button>
		</Tooltip>
	)
}
