import React, { useCallback, useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { Portal } from './portal'
import { Button } from './button'
import { fadeIn, fadeOut, popIn } from '~/styles/keyframes'

const FOCUSABLE_ELEMENT_QUERY = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]' as const

interface ModalProps {
	open: boolean
	onClose: () => void
	title?: string
	content?: React.ReactNode
}

export const Modal = ({ open, ...props }: ModalProps) => {
	if (!open) {
		return <></>
	}

	return (
		<Portal>
			<Core {...props} />
		</Portal>
	)
}

const Core = ({
	content,
	onClose: onCloseProp,
	title,
}: Omit<ModalProps, 'open'>) => {
	const [close, setClose] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const onClose = useCallback(() => {
		setClose(true)
		setTimeout(() => {
			onCloseProp?.()
		}, 300)
	}, [onCloseProp])

	const onClickModal = useCallback<React.MouseEventHandler<HTMLDivElement>>(
		(event) => {
			event.stopPropagation()
		},
		[]
	)

	useEffect(() => {
		if (!ref.current) {
			return
		}
		const focusedElementBeforeModal = document.activeElement as HTMLElement

		const firstTabStop = ref.current.querySelector(
			FOCUSABLE_ELEMENT_QUERY
		) as HTMLElement

		firstTabStop.focus()

		return () => {
			focusedElementBeforeModal.focus()
		}
	}, [])
	const onKeyDown = useCallback(
		(event: React.KeyboardEvent) => {
			if (!ref.current) {
				return
			}

			const focusableElements = ref.current.querySelectorAll(
				FOCUSABLE_ELEMENT_QUERY
			)

			const firstTabStop = focusableElements[0] as HTMLElement
			const lastTabStop = focusableElements[
				focusableElements.length - 1
			] as HTMLElement
			if (event.key === 'Tab') {
				if (event.shiftKey) {
					// SHIFT + TAB
					if (document.activeElement === firstTabStop) {
						event.preventDefault()
						lastTabStop.focus()
					}
				} else {
					// TAB
					if (document.activeElement === lastTabStop) {
						event.preventDefault()
						firstTabStop.focus()
					}
				}
			}

			if (event.key === 'Escape') {
				onClose?.()
			}
		},
		[onClose]
	)

	return (
		<div css={dimmerStyles(close)} onClick={onClose}>
			<div
				css={rootStyles}
				ref={ref}
				onKeyDown={onKeyDown}
				onClick={onClickModal}
			>
				{title && <div css={titleStyles}>{title}</div>}
				{content && <div css={contentStyles}>{content}</div>}
				<div css={actionStyles}>
					<Button type="button" buttonProps={{}} color="red" variant="outline">
						Cancel
					</Button>
					<Button type="button" buttonProps={{}} color="red" variant="primary">
						Delete
					</Button>
				</div>
			</div>
		</div>
	)
}

const dimmerStyles = (close: boolean) => css`
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 1000;
	display: flex;
	justify-content: center;
	align-items: center;
	${close
		? css`
				animation: ${fadeOut} 0.3s forwards;
		  `
		: css`
				animation: ${fadeIn} 0.3s forwards;
		  `}
`

const rootStyles = css`
	background-color: #ffffff;
	padding: 32px;
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	animation: ${popIn} 0.3s forwards ease-out;
`

const titleStyles = css`
	font-size: 24px;
	font-weight: 700;
	margin-bottom: 16px;
`

const contentStyles = css`
	margin-bottom: 32px;
`

const actionStyles = css`
	align-self: flex-end;
	display: flex;
	& > *:not(:last-child) {
		margin-right: 16px;
	}
`
