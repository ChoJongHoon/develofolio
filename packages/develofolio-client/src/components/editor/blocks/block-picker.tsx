import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useSlate } from 'slate-react'
import { Portal } from '~/components/base/portal'
import { getScrollbarWidth } from '~/styles/get-scrollbar-width'
import { zIndexes } from '~/styles/z-indexes'
import {
	setBlockPickerSelectedIndex,
	setBlockPickerShow,
} from '../editor.reducer'
import AboutMeThumbnail from 'public/images/block-thumbnails/about-me.svg'
import FocusLock from 'react-focus-lock'

const BLOCKS = [1, 2, 3, 4]

export const BlockPicker = () => {
	const dispatch = useDispatch()
	const { selectedIndex, show } = useSelector(
		(state) => state.editor.blockPicker,
		shallowEqual
	)
	console.log(`selectedIndex`, selectedIndex)
	const drawerRef = useRef<HTMLDivElement>(null)
	const backdropRef = useRef<HTMLDivElement>(null)
	const [isVisible, setIsVidible] = useState(false)
	const [isMounted, setIsMounted] = useState(false)
	useEffect(() => {
		setIsMounted(true)
		return () => {
			setIsMounted(false)
		}
	}, [])
	const animateOutTimer = useRef<NodeJS.Timeout | null>(null)
	const animateStartTimer = useRef<number | null>(null)

	useEffect(() => {
		if (show) {
			animateStartTimer.current = requestAnimationFrame(() => {
				document.body.style.overflow = 'hidden'
				document.body.style.paddingRight = `${getScrollbarWidth()}px`

				setIsVidible(true)
			})
		} else {
			animateOutTimer.current = setTimeout(() => {
				document.body.style.overflow = ''
				document.body.style.paddingRight = ``
				setIsVidible(false)
			}, 300)
		}
	}, [show])

	const onClose = useCallback(() => {
		dispatch(setBlockPickerShow(false))
	}, [dispatch])

	const onRootClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
		(event) => {
			if (
				event.target &&
				event.target instanceof HTMLElement &&
				event.target.contains(backdropRef.current)
			) {
				onClose()
			}
		},
		[onClose]
	)

	const onBlockMouseEnter = useCallback<
		React.MouseEventHandler<HTMLButtonElement>
	>((event) => {
		event.currentTarget.focus()
	}, [])

	const editor = useSlate()

	const onBlockClick = useCallback(() => {
		drawerRef.current?.childNodes.forEach((child, index) => {
			if (child instanceof HTMLElement) {
				child.style.transform = `translateX(${
					index === selectedIndex ? '-40px' : '600px'
				})`
			}
		})
		onClose()
	}, [onClose, selectedIndex])

	if (!isMounted) {
		return <></>
	}

	if (!show && !isVisible) {
		return <></>
	}

	return (
		<Portal>
			<FocusLock autoFocus returnFocus>
				<div css={root(show)} onClick={onRootClick}>
					<div ref={backdropRef} css={drawerContainer}>
						<div ref={drawerRef} css={drawer(show, isVisible)}>
							{BLOCKS.map((key, index) => (
								<button
									key={key}
									css={blockThumbnail}
									onMouseEnter={onBlockMouseEnter}
									onFocus={() => {
										dispatch(setBlockPickerSelectedIndex(index))
									}}
									onClick={onBlockClick}
								>
									<div className="thumbnail">
										<AboutMeThumbnail />
									</div>
									<h4 className="title">About me</h4>
									<span className="description">
										Your name, photo, description and links
									</span>
								</button>
							))}
						</div>
					</div>
				</div>
			</FocusLock>
		</Portal>
	)
}

const root = (isOpen: boolean) => css`
	z-index: ${zIndexes.backdrop};
	position: fixed;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	overflow-x: hidden;
	overflow-y: auto;
	pointer-events: ${isOpen ? 'auto' : 'none'};
	/* background-color: green; */
`

const drawerContainer = css`
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	width: 100%;
	min-height: 100%;
	user-select: none;
	pointer-events: auto;
	background-color: rgba(0, 0, 0, 0.5);
	-webkit-tap-highlight-color: transparent;
`

const drawer = (isOpen: boolean, isVisible: boolean) => css`
	z-index: ${zIndexes.backdrop};
	height: fit-content;
	transition: opacity 0.3s, transform 0.3s;
	opacity: ${isVisible && isOpen ? 1 : 0};
	transform: translateX(${isVisible ? '0' : '512px'});
	color: ${OpenColor.white};
	padding-top: 32px;
	padding-right: 16px;
	padding-bottom: 32px;
	display: flex;
	flex-direction: column;
	gap: 32px;
	user-select: text;
	pointer-events: ${isOpen ? 'all' : 'none'};
`

const blockThumbnail = css`
	border: none;
	cursor: pointer;
	background: rgba(0, 0, 0, 0.3);
	backdrop-filter: blur(60px);
	border-radius: 16px;
	padding: 8px;
	display: flex;
	flex-direction: column;

	& > .thumbnail {
		margin-bottom: 4px;
	}
	& > .title {
		margin-bottom: 8px;
		color: ${OpenColor.white};
	}
	& > .description {
		color: ${OpenColor.gray[0]};
	}
	transition: transform 0.2s;
	transform-origin: center right;
	&:focus {
		transform: scale(1.05);
		outline: none;
	}
`
