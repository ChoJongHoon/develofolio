import { Offsets, Placement } from '@popperjs/core'
import React, {
	Dispatch,
	HTMLProps,
	SetStateAction,
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react'
import ReactFocusLock from 'react-focus-lock'
import { usePopper } from 'react-popper'
import { usePopover } from './use-popover'
import { Layer } from '../layer/layer'

interface AnchorProps {
	'aria-controls'?: string | null
	'aria-describedby'?: string | null
	'aria-expanded'?: string
	'aria-haspopup'?: string
	'aria-owns'?: string | null
	id?: string | null
	onBlur?: (e: Event) => void
	onClick?: (e: Event) => void
	onFocus?: (e: Event) => void
	onMouseEnter?: () => void
	onMouseLeave?: () => void
	ref?: Dispatch<SetStateAction<HTMLButtonElement | null>>
	tabIndex?: number
	key?: string
}

interface PopoverProps {
	anchor: React.ReactNode
	content: React.ReactNode
	placement?: Placement
	offset?: Offsets
	triggerType?: 'click' | 'hover'
	focusLock?: boolean
	autoHideDuration?: number
}

export const Popover = ({
	anchor,
	content,
	placement,
	triggerType = 'click',
	focusLock = true,
	autoHideDuration = 0,
	offset = {
		y: 0,
		x: 0,
	},
}: PopoverProps) => {
	const [referenceEl, setReferenceEl] = useState<HTMLButtonElement | null>(null)
	const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null)

	const contentRef = useRef<HTMLSpanElement | null>(null)
	const anchorRef = useRef<HTMLSpanElement | null>(null)

	const isHover = triggerType === 'hover'

	const { styles, attributes } = usePopper(referenceEl, popperEl, {
		placement,
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [offset.y, offset.x],
				},
			},
			{
				name: 'flip',
				options: {
					flipVariations: false,
					padding: 20,
				},
			},
		],
	})

	const [
		isOpen,
		closePopover,
		togglePopover,
		onAnchorMouseEnter,
		onAnchorMouseLeave,
		onPopoverMouseEnter,
		onPopoverMouseLeave,
		autoHidePopover,
	] = usePopover(autoHideDuration)

	const getAnchorProps = useCallback(() => {
		const anchorProps: AnchorProps = {
			'aria-haspopup': 'true',
			'aria-expanded': isOpen ? 'true' : 'false',
			key: 'popover-anchor',
			ref: setReferenceEl,
		}
		if (isHover) {
			anchorProps.onMouseEnter = onAnchorMouseEnter
			anchorProps.onMouseLeave = onAnchorMouseLeave
			return anchorProps
		}
		if (autoHideDuration === 0) {
			anchorProps.onClick = togglePopover
		} else {
			anchorProps.onClick = autoHidePopover
		}
		return anchorProps
	}, [
		autoHideDuration,
		autoHidePopover,
		isHover,
		isOpen,
		onAnchorMouseEnter,
		onAnchorMouseLeave,
		togglePopover,
	])

	const renderAnchor = useMemo(() => {
		const anchorProps = getAnchorProps()
		if (typeof anchor === 'object' && React.isValidElement(anchor)) {
			return React.cloneElement(anchor, anchorProps)
		}
	}, [anchor, getAnchorProps])

	const onDocumentClick = useCallback(
		(e: MouseEvent) => {
			const target = e.composedPath ? e.composedPath()[0] : e.target
			const popper = contentRef.current
			const anchor = anchorRef.current

			if (!popper || popper === target || popper.contains(target as Node)) {
				return
			}
			if (!anchor || anchor === target || anchor.contains(target as Node)) {
				return
			}
			closePopover()
		},
		[closePopover]
	)

	const getPopoverBodyProps = useCallback(() => {
		const bodyProps: HTMLProps<HTMLDivElement> = {}
		if (isHover || autoHideDuration > 0) {
			bodyProps.onMouseEnter = onPopoverMouseEnter
			bodyProps.onMouseLeave = onPopoverMouseLeave
		}
		return bodyProps
	}, [autoHideDuration, isHover, onPopoverMouseEnter, onPopoverMouseLeave])

	return (
		<>
			<span ref={anchorRef}>{anchor && renderAnchor}</span>
			{isOpen && (
				<Layer
					key="new-layer"
					onDocumentClick={onDocumentClick}
					onEscape={closePopover}
				>
					<ReactFocusLock disabled={!focusLock}>
						<div
							className="popper-body"
							style={styles.popper}
							ref={setPopperEl}
							{...attributes.popper}
							{...getPopoverBodyProps()}
						>
							<span ref={contentRef}>{content}</span>
						</div>
					</ReactFocusLock>
				</Layer>
			)}
		</>
	)
}
