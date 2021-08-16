import { FC, forwardRef, useRef } from 'react'
import { Icon, IconType } from '../../../components/icon'
import { useDndBlock } from './hooks/use-dnd-block'
import OpenColor from 'open-color'
import { useHover } from '~/hooks/use-hover'
import mergeRefs from 'react-merge-refs'
import { useStyletron } from 'styletron-react'
import { borderRadius, padding, transitions } from 'polished'
import { Grid, GridOverrides } from 'baseui/layout-grid'
import { up } from '~/styles/responsive'
import classNames from 'classnames'
import { useState } from 'react'
import { StatefulPopover } from 'baseui/popover'
import { StatefulMenu } from 'baseui/menu'
import { Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { CustomElement } from '../custom-types'
import { LabelSmall } from 'baseui/typography'

interface IMenu {
	id: string
	label: string
	icon: IconType
}

const MENUS: IMenu[] = [
	{
		id: 'DELETE',
		label: '삭제',
		icon: 'TrashLine',
	},
]

interface RootDraggableProps {
	id: string
	className?: string
	overrides?: GridOverrides
	element: CustomElement
}

export const RootDraggable: FC<RootDraggableProps> = ({
	children,
	id,
	className,
	overrides,
	element,
}) => {
	const editor = useSlate()
	const [css] = useStyletron()
	const rootRef = useRef<HTMLDivElement>(null)
	const [hoverRef, isHovered] = useHover()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const path = ReactEditor.findPath(editor, element)

	const { dropLine, dragRef, isDragging } = useDndBlock({
		id,
		blockRef: rootRef,
	})

	return (
		<div
			className={classNames(
				css({
					position: 'relative',
					opacity: isDragging ? 0.5 : 1,
					marginTop: '4px',
					marginBottom: '4px',
				}),
				className
			)}
			ref={mergeRefs([rootRef, hoverRef])}
		>
			<Grid overrides={overrides}>
				{children}
				{dropLine && (
					<div
						className={css({
							position: 'absolute',
							left: '0',
							right: '0',
							top: dropLine === 'top' ? '-2px' : undefined,
							bottom: dropLine === 'bottom' ? '-2px' : undefined,
							height: '4px',
							background: OpenColor.blue[2],
						})}
						contentEditable={false}
					/>
				)}
				<StatefulPopover
					triggerType="click"
					onOpen={() => {
						setIsMenuOpen(true)
					}}
					onClose={() => {
						setIsMenuOpen(false)
					}}
					accessibilityType="menu"
					content={() => (
						<StatefulMenu<IMenu>
							items={MENUS}
							overrides={{
								List: {
									style: {
										...borderRadius('top', '4px'),
										...borderRadius('bottom', '4px'),
										minWidth: '180px',
									},
								},
								Option: {
									component: Option,
								},
							}}
							onItemSelect={({ item }) => {
								if (item.id === 'DELETE') {
									Transforms.removeNodes(editor, {
										at: path,
									})
								}
							}}
						/>
					)}
					overrides={{
						Body: {
							style: {
								...borderRadius('top', '4px'),
								...borderRadius('bottom', '4px'),
							},
						},
						Inner: {
							style: {
								...borderRadius('top', '4px'),
								...borderRadius('bottom', '4px'),
							},
						},
					}}
					placement="bottomLeft"
				>
					<div
						className={css({
							boxSizing: 'border-box',
							...padding('0px'),
							position: 'absolute',
							display: 'flex',
							transform: 'translateX(-7.5px)',
							[up('MEDIUM')]: {
								transform: 'translateX(-6px)',
							},
						})}
						contentEditable={false}
					>
						<button
							ref={dragRef}
							className={css({
								cursor: 'grab',
								border: 'none',
								background: 'none',
								...padding('4px', '0px'),
								display: 'inline-flex',
								outlineStyle: 'none',
								opacity: isMenuOpen || isHovered ? 1 : 0,
								...transitions(['opacity'], '0.2s'),
								pointerEvents: 'auto',
								alignItems: 'center',
								borderRadius: '4px',
								':hover': {
									backgroundColor: OpenColor.gray[1],
								},
							})}
						>
							<Icon
								type="DragHandle"
								color={OpenColor.gray[5]}
								className={css({
									width: '15.5px',
									height: '15.5px',
									[up('MEDIUM')]: {
										width: '20px',
										height: '20px',
									},
								})}
							/>
						</button>
					</div>
				</StatefulPopover>
				{isMenuOpen && (
					<div
						className={css({
							position: 'absolute',
							userSelect: 'none',
							pointerEvents: 'none',
							top: '0px',
							left: '0px',
							width: '100%',
							height: '100%',
							backgroundColor: 'rgba(46, 170, 220, 0.2)',
						})}
					/>
				)}
			</Grid>
		</div>
	)
}

interface OptionProps {
	$disabled: boolean
	$isFocused: boolean
	$isHighlighted: boolean
	$style: any
	'aria-disabled': boolean
	'aria-selected': boolean
	id: 'bui-46'
	item: IMenu
	onClick: () => void
	onMouseEnter: () => void
	renderAll: boolean
	resetMenu: () => any
	overrides: any
}

const Option = forwardRef<HTMLLIElement, OptionProps>(
	(
		{
			$disabled,
			$isFocused,
			$isHighlighted,
			$style,
			resetMenu,
			renderAll,
			item,
			overrides,
			...rest
		},
		ref
	) => {
		const [css] = useStyletron()
		return (
			<li
				ref={ref}
				className={css({
					display: 'flex',
					alignItems: 'center',
					...padding('4px', '16px'),
					gap: '8px',
					cursor: 'pointer',
					backgroundColor: $isHighlighted ? OpenColor.gray[1] : undefined,
					...transitions(['background-color'], '0.2s'),
				})}
				{...rest}
			>
				<Icon type={item.icon} size={18} color={OpenColor.gray[7]} />
				<LabelSmall color={OpenColor.gray[7]}>{item.label}</LabelSmall>
			</li>
		)
	}
)
