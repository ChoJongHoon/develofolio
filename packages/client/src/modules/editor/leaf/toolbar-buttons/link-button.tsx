import { Button } from 'baseui/button'
import { Input } from 'baseui/input'
import OpenColor from 'open-color'
import {
	borderColor,
	borderRadius,
	borderWidth,
	padding,
	transitions,
} from 'polished'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Range, Text, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon } from '~/components/icon'
import { ToolbarButton } from './toolbar-button'
import { getSelectedText } from '../utils'

interface LinkButtonProps {
	setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
}

export const LinkButton = ({ setIsFocused }: LinkButtonProps) => {
	const [css] = useStyletron()
	const editor = useSlate()
	const node = getSelectedText(editor)
	const link = node?.link
	const [isOpen, setIsOpen] = useState(false)
	const [selection, setSelection] = useState<Range | undefined>()

	return (
		<div className={css({ position: 'relative' })}>
			<ToolbarButton
				icon="Link"
				isActive={Boolean(link)}
				onMouseDown={(event) => {
					event.preventDefault()
					if (link) {
						Transforms.setNodes(
							editor,
							{
								link: undefined,
							},
							{ match: Text.isText, split: true, at: selection }
						)
					} else if (editor.selection) {
						setIsOpen(true)
						setSelection(editor.selection)
					}
				}}
			/>
			{isOpen && selection && (
				<LinkForm
					setIsFocused={setIsFocused}
					setIsOpen={setIsOpen}
					selection={selection}
				/>
			)}
		</div>
	)
}

interface LinkFormProps {
	setIsFocused: React.Dispatch<React.SetStateAction<boolean>>
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	selection: Range
}
const LinkForm = ({ setIsFocused, setIsOpen, selection }: LinkFormProps) => {
	const [css] = useStyletron()
	const editor = useSlate()
	const {
		register,
		handleSubmit,
		formState: { isValid },
		setFocus,
	} = useForm<{ link: string }>({
		mode: 'onChange',
	})
	const { onBlur, ref, ...rest } = register('link', { required: true })
	useEffect(() => {
		setFocus('link')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<form
			className={css({
				position: 'absolute',
				left: '50%',
				transform: 'translateX(-50%)',
				backgroundColor: OpenColor.gray[0],
				boxShadow: '0 0.5rem 1.5rem rgb(0 0 0 / 20%)',
				...borderRadius('top', '8px'),
				...borderRadius('bottom', '8px'),
				...padding('4px'),
				display: 'flex',
				flexDirection: 'row',
				gap: '4px',
			})}
			onSubmit={handleSubmit(({ link }) => {
				Transforms.setNodes(
					editor,
					{
						link,
					},
					{ match: Text.isText, split: true, at: selection }
				)
				setIsOpen(false)
				setIsFocused(false)
			})}
		>
			<Input
				onFocus={() => setIsFocused(true)}
				onBlur={(event) => {
					onBlur(event)
					setIsFocused(false)
				}}
				onKeyDown={(event) => {
					if (event.key === 'Escape') {
						event.preventDefault()
						event.currentTarget.blur()
						setIsOpen(false)
					}
				}}
				size="mini"
				autoFocus
				inputRef={ref}
				overrides={{
					Root: {
						style: {
							...borderRadius('top', '4px'),
							...borderRadius('bottom', '4px'),
							...borderColor(OpenColor.gray[4]),
							...borderWidth('1px'),
						},
					},
					Input: {
						style: {
							...borderRadius('top', '4px'),
							...borderRadius('bottom', '4px'),
							width: '240px',
							...padding('4px', '8px'),
							caretColor: OpenColor.gray[6],
							['::placeholder']: {
								color: OpenColor.gray[5],
							},
						},
					},
				}}
				placeholder="Paste link"
				{...rest}
			/>
			<Button
				size="mini"
				kind="tertiary"
				overrides={{
					BaseButton: {
						style: {
							backgroundColor: OpenColor.green[6],
							...padding('4px'),
							...borderRadius('top', '4px'),
							...borderRadius('bottom', '4px'),
							[':hover']: {
								backgroundColor: OpenColor.green[4],
							},
							[':disabled']: {
								backgroundColor: OpenColor.gray[1],
								[':hover']: {
									backgroundColor: OpenColor.gray[1],
								},
							},
						},
					},
				}}
				disabled={!isValid}
			>
				<Icon
					type="Link"
					size={24}
					color={isValid ? OpenColor.gray[0] : OpenColor.gray[6]}
					className={css({
						...transitions(['fill'], '0.2s'),
					})}
				/>
			</Button>
		</form>
	)
}
