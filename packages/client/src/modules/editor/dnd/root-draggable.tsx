import { FC, useRef } from 'react'
import { Icon } from '../../../components/icon'
import { useDndBlock } from './hooks/use-dnd-block'
import OpenColor from 'open-color'
import { useHover } from '~/hooks/use-hover'
import mergeRefs from 'react-merge-refs'
import { useStyletron } from 'styletron-react'
import { padding, transitions } from 'polished'
import { Grid, GridOverrides } from 'baseui/layout-grid'
import { up } from '~/styles/responsive'
import classNames from 'classnames'

type RootDraggableProps = {
	id?: string
	className?: string
	overrides?: GridOverrides
}

export const RootDraggable: FC<RootDraggableProps> = ({
	children,
	id,
	className,
	overrides,
}) => {
	const [css] = useStyletron()
	const rootRef = useRef<HTMLDivElement>(null)
	const [hoverRef, isHovered] = useHover()

	const { dropLine, dragRef, isDragging } = useDndBlock({
		id: id as string,
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
				<div
					className={css({
						boxSizing: 'border-box',
						...padding('0px'),
						position: 'absolute',
						display: 'flex',
						height: '100%',
						transform: 'translateX(-7.5px)',
						[up('MEDIUM')]: {
							transform: 'translateX(-2px)',
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
							...padding('0px'),
							display: 'inline-flex',
							outlineStyle: 'none',
							opacity: isHovered ? 1 : 0,
							...transitions(['opacity'], '0.2s'),
							pointerEvents: 'auto',
							alignItems: 'center',
							borderRadius: '4px',
							':hover': {
								backgroundColor: OpenColor.gray[1],
							},
						})}
						onMouseDown={(event) => event.stopPropagation()}
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
			</Grid>
		</div>
	)
}
