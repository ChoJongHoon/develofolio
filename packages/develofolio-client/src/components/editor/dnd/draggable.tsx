import React, { FC, useRef } from 'react'
import { css } from '@emotion/react'
import { Icon } from '../../base/icon'
import { useDndBlock } from './hooks/use-dnd-block'
import OpenColor from 'open-color'

type DraggableProps = {
	id: string
}

export const Draggable: FC<DraggableProps> = ({ children, id }) => {
	const rootRef = useRef<HTMLDivElement>(null)

	const { dropLine, dragRef, isDragging } = useDndBlock({
		id: id as string,
		blockRef: rootRef,
	})

	return (
		<div css={rootStyles(isDragging)} ref={rootRef}>
			<div css={block}>
				{children}
				{dropLine && (
					<div css={dropLineStyles(dropLine)} contentEditable={false} />
				)}
			</div>
			<div css={gutter} contentEditable={false}>
				<button
					ref={dragRef}
					css={dragButtonStyles}
					onMouseDown={(event) => event.stopPropagation()}
				>
					<Icon type="DragHandle" size={20} color={OpenColor.gray[5]} />
				</button>
			</div>
		</div>
	)
}

const rootStyles = (isDragging: boolean) => css`
	position: relative;
	opacity: ${isDragging ? 0.5 : 1};
	&:hover .css-${dragButtonStyles.name} {
		opacity: 1;
	}
`

const block = css`
	padding: 4px 0px;
`

const gutter = css`
	box-sizing: border-box;
	padding: 0px;
	position: absolute;
	top: 0px;
	transform: translateX(-100%);
	display: flex;
	height: 100%;
`

const dragButtonStyles = css`
	cursor: grab;
	outline: none;
	border: none;
	background: none;
	padding: 0;
	display: inline-flex;
	outline: none;
	opacity: 0;
	transition: opacity 0.2s;
	margin-right: 4px;
	pointer-events: auto;
	align-items: center;
	border-radius: 4px;
	&:hover {
		background-color: ${OpenColor.gray[1]};
	}
`

const dropLineStyles = (direction: 'top' | 'bottom') => css`
	position: absolute;
	left: 0;
	right: 0;
	top: ${direction === 'top' ? '-2px' : undefined};
	bottom: ${direction === 'bottom' ? '-2px' : undefined};
	height: 4px;
	background: ${OpenColor.blue[2]};
`
