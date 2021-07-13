import OpenColor from 'open-color'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useSlate } from 'slate-react'
import { Portal } from '~/components/portal'
import { getScrollbarWidth } from '~/styles/get-scrollbar-width'
import { zIndexes } from '~/styles/z-indexes'
import {
	setBlockPickerSelectedIndex,
	setBlockPickerShow,
} from '../editor.reducer'
import AboutMeThumbnail from 'public/images/block-thumbnails/about-me.svg'
import FocusLock from 'react-focus-lock'
import { Descendant, Transforms } from 'slate'
import { useStyletron } from 'styletron-react'
import { transitions } from 'polished'

const BLOCKS: Array<{ name: string; description: string; node: Descendant }> = [
	{
		name: '스킬 리스트',
		description: '사용할 수 있는 기술을 나열하는 그리드 형태의 블럭입니다.',
		node: {
			type: 'skill-list',
			children: [
				{
					type: 'skill-list-item',
					children: [
						{
							type: 'skill-list-item-logos',
							logos: [
								{
									file: 'react.svg',
									name: 'React',
									shortname: 'react',
									url: 'https://facebook.github.io/react/',
								},
							],
							children: [{ text: '' }],
						},
						{ type: 'skill-list-item-name', children: [{ text: 'Name' }] },
						{
							type: 'skill-list-item-description',
							children: [{ text: 'Description' }],
						},
					],
				},
			],
		},
	},
]

export const BlockPicker = () => {
	const [css] = useStyletron()
	const dispatch = useDispatch()
	const { selectedIndex, show } = useSelector(
		(state) => state.editor.blockPicker,
		shallowEqual
	)

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

	const onClose = useCallback(
		(selectedIndex?: number) => {
			dispatch(setBlockPickerShow(false))
			drawerRef.current?.childNodes.forEach((child, index) => {
				if (child instanceof HTMLElement) {
					child.style.transform = `translateX(${
						index === selectedIndex ? '-40px' : '600px'
					})`
				}
			})
		},
		[dispatch]
	)

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

	if (!isMounted) {
		return <></>
	}

	if (!show && !isVisible) {
		return <></>
	}

	return (
		<Portal>
			<FocusLock autoFocus>
				<div
					className={css({
						zIndex: zIndexes.backdrop,
						position: 'fixed',
						right: '0px',
						bottom: '0px',
						top: '0px',
						left: '0px',
						overflowX: 'hidden',
						overflowY: 'auto',
						pointerEvents: show ? 'auto' : 'none',
					})}
					onClick={onRootClick}
				>
					<div
						ref={backdropRef}
						className={css({
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'flex-end',
							width: '100%',
							minHeight: '100%',
							userSelect: 'none',
							pointerEvents: 'auto',
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							WebkitTapHighlightColor: 'transparent',
						})}
					>
						<div
							ref={drawerRef}
							className={css({
								zIndex: zIndexes.backdrop,
								height: 'fit-content',
								...transitions(['opacity', 'transform'], '0.3s'),
								opacity: isVisible && show ? 1 : 0,
								transform: `translateX(${isVisible ? '0' : '512px'})`,
								color: OpenColor.white,
								paddingTop: '32px',
								paddingRight: '16px',
								paddingBottom: '32px',
								display: 'flex',
								flexDirection: 'column',
								gap: '32px',
								userSelect: 'text',
								pointerEvents: show ? 'all' : 'none',
							})}
						>
							{BLOCKS.map((block, index) => (
								<button
									key={block.name}
									className={css({
										borderStyle: 'none',
										cursor: 'pointer',
										background: 'rgba(0, 0, 0, 0.3)',
										backdropFilter: 'blur(60px)',
										borderRadius: '16px',
										padding: '8px',
										display: 'flex',
										flexDirection: 'column',
										...transitions('transform', '0.2s'),
										transformOrigin: 'center right',
										':focus': {
											transform: 'scale(1.05)',
											outlineStyle: 'none',
										},
									})}
									onMouseEnter={onBlockMouseEnter}
									onFocus={() => {
										dispatch(setBlockPickerSelectedIndex(index))
									}}
									onClick={() => {
										Transforms.insertNodes(editor, block.node)
										onClose(index)
									}}
								>
									<div className={css({ marginBottom: '4px' })}>
										<AboutMeThumbnail />
									</div>
									<h4
										className={css({
											marginBottom: '8px',
											color: OpenColor.white,
										})}
									>
										{block.name}
									</h4>
									<span
										className={css({
											color: OpenColor.gray[0],
										})}
									>
										{block.description}
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
