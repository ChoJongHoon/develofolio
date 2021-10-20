import OpenColor from 'open-color'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSlate, ReactEditor } from 'slate-react'
import { Portal } from '~/components/portal'
import { getScrollbarWidth } from '~/styles/get-scrollbar-width'
import { zIndexes } from '~/styles/z-indexes'
import FocusLock from 'react-focus-lock'
import { Descendant, Node, Transforms } from 'slate'
import { useStyletron } from 'styletron-react'
import { borderRadius, transitions } from 'polished'
import { generateProjectListElement } from '../project-list/project-list'
import { generateSkillListElement } from '../skill-list/skill-list'
import { generateSchoolListElement } from '../school-list/school-list'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
	blockPickerSelectedIndexState,
	blockPickerShowState,
} from '../editor.atoms'
import { generateCareerListElement } from '../career-list/career-list'
import Image from 'next/image'
import SkillListThumbnail from 'public/images/block-thumbnails/skill-list.png'
import ProjectListThumbnail from 'public/images/block-thumbnails/project-list.png'
import SchoolListThumbnail from 'public/images/block-thumbnails/school-list.png'
import CareerListThumbnail from 'public/images/block-thumbnails/career-list.png'
import { LabelLarge, LabelSmall, LabelXSmall } from 'baseui/typography'

const BLOCKS: Array<{
	name: string
	description: string
	generateNode: () => Descendant
	thumbnail: StaticImageData
}> = [
	{
		name: '스킬 리스트',
		description: '사용할 수 있는 기술을 나열하는 그리드 형태의 블럭입니다.',
		generateNode: generateSkillListElement,
		thumbnail: SkillListThumbnail,
	},
	{
		name: '프로젝트 리스트',
		description: '주요 프로젝트를 소개합니다.',
		generateNode: generateProjectListElement,
		thumbnail: ProjectListThumbnail,
	},
	{
		name: '학력 리스트',
		description: '본인의 학력을 작성해주세요.',
		generateNode: generateSchoolListElement,
		thumbnail: SchoolListThumbnail,
	},
	{
		name: '경력 리스트',
		description: '본인의 경력을 작성해주세요.',
		generateNode: generateCareerListElement,
		thumbnail: CareerListThumbnail,
	},
]

export const BlockPicker = () => {
	const [css] = useStyletron()
	const [show, setShow] = useRecoilState(blockPickerShowState)
	const setSelectedIndex = useSetRecoilState(blockPickerSelectedIndexState)

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
			setShow(false)
			drawerRef.current?.childNodes.forEach((child, index) => {
				if (child instanceof HTMLElement) {
					child.style.transform = `translateX(${
						index === selectedIndex ? '-40px' : '600px'
					})`
				}
			})
		},
		[setShow]
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
										setSelectedIndex(index)
									}}
									onClick={() => {
										Transforms.insertNodes(editor, block.generateNode(), {
											at: [editor.children.length],
										})
										onClose(index)
									}}
								>
									<div className={css({ marginBottom: '4px' })}>
										<Image
											src={block.thumbnail}
											alt="Thumbnail"
											width={496}
											height={
												block.thumbnail.height / (block.thumbnail.width / 496)
											}
											className={css({
												backgroundColor: OpenColor.gray[0],
												...borderRadius('top', '8px'),
												...borderRadius('bottom', '8px'),
											})}
										/>
									</div>
									<LabelLarge
										$style={{
											marginBottom: '8px',
											fontWeight: 'bold',
										}}
										color={OpenColor.gray[0]}
									>
										{block.name}
									</LabelLarge>
									<LabelSmall color={OpenColor.gray[3]}>
										{block.description}
									</LabelSmall>
								</button>
							))}
						</div>
					</div>
				</div>
			</FocusLock>
		</Portal>
	)
}
