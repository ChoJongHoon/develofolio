import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import logos from 'public/logos.json'
import Image from 'next/image'
import styled from 'styled-components'
import oc from 'open-color'
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window'
import useSearchLogos from 'src/lib/hooks/useSearchLogos'

const ICON_SIZE = 40
const BOX_WIDTH = 320
const MAX_HEIGHT = 224

export default function IconPicker() {
	const [value, setValue] = useState('')
	const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		(event) => {
			setValue(event.target.value)
		},
		[]
	)

	const result = useSearchLogos(value)

	const columnCount = useMemo(() => Math.floor(BOX_WIDTH / ICON_SIZE), [])
	const rowCount = useMemo(() => Math.ceil(result.length / columnCount), [
		result,
		columnCount,
	])
	const gridHeight = useMemo(() => Math.min(rowCount * 40, MAX_HEIGHT), [
		rowCount,
	])

	const [selectedIndex, setSelectedIndex] = useState(0)

	const onKeyDown = useCallback<React.KeyboardEventHandler<HTMLInputElement>>(
		(event) => {
			switch (event.key) {
				case 'ArrowLeft':
					setSelectedIndex((prev) => Math.max(prev - 1, 0))
					event.preventDefault()
					break
				case 'ArrowRight':
					setSelectedIndex((prev) => Math.min(prev + 1, result.length - 1))
					event.preventDefault()
					break
				case 'ArrowUp':
					setSelectedIndex((prev) => Math.max(prev - columnCount, 0))
					event.preventDefault()
					break
				case 'ArrowDown':
					setSelectedIndex((prev) =>
						Math.min(prev + columnCount, result.length - 1)
					)
					event.preventDefault()
					break
			}
		},
		[result, columnCount]
	)

	/**
	 * 검색어가 변경되면 selectedIndex 리셋
	 */
	useEffect(() => {
		setSelectedIndex(0)
	}, [result])

	const ref = useRef<Grid>(null)
	/**
	 * 현재 선택된 아이템으로 스크롤 이동
	 */
	useEffect(() => {
		ref.current?.scrollToItem({ rowIndex: selectedIndex / columnCount })
	}, [selectedIndex, columnCount])

	return (
		<Box>
			<Input value={value} onChange={onChange} onKeyDown={onKeyDown} />
			<GridWrapper>
				<Grid
					height={gridHeight}
					width={BOX_WIDTH}
					columnCount={columnCount}
					columnWidth={ICON_SIZE}
					rowCount={rowCount}
					rowHeight={ICON_SIZE}
					itemData={{
						columnCount,
						filteredLogos: result,
						selectedIndex,
						setSelectedIndex,
					}}
					ref={ref}
				>
					{Cell}
				</Grid>
			</GridWrapper>
		</Box>
	)
}

type ItemData = {
	columnCount: number
	filteredLogos: typeof logos
	selectedIndex: number
	setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

const Cell = ({
	columnIndex,
	data,
	rowIndex,
	style,
}: GridChildComponentProps<ItemData>) => {
	const { columnCount, filteredLogos, selectedIndex, setSelectedIndex } = data
	const singleColumnIndex = columnIndex + rowIndex * columnCount
	const logo = filteredLogos[singleColumnIndex]
	const selected = useMemo(() => selectedIndex === singleColumnIndex, [
		selectedIndex,
		singleColumnIndex,
	])
	const onMouseEnter = useCallback(() => {
		setSelectedIndex(singleColumnIndex)
	}, [setSelectedIndex, singleColumnIndex])

	return (
		<div style={style}>
			{logo && (
				<Item key={logo.name} selected={selected} onMouseEnter={onMouseEnter}>
					<Image
						key={logo.name}
						src={`/logos/${logo.files[0]}`}
						width={24}
						height={24}
						layout="fixed"
					/>
				</Item>
			)}
		</div>
	)
}

const Box = styled.div`
	box-sizing: border-box;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	padding: 8px;
	border: 1px solid ${oc.gray[2]};
	overflow: hidden;
	flex-direction: column;
	border-radius: 8px;
`

const Input = styled.input`
	margin-bottom: 8px;
	font-size: 14px;
	padding: 4px 8px;
	border-radius: 4px;
	background-color: ${oc.gray[1]};
	border: 1px solid ${oc.gray[2]};
`

const GridWrapper = styled.div`
	max-height: 240px;
	overflow-y: auto;
	width: 320px;
`

const Item = styled.button<{ selected: boolean }>`
	width: ${ICON_SIZE}px;
	height: ${ICON_SIZE}px;
	padding: 0px;
	cursor: pointer;
	background-color: transparent;
	border: none;
	border-radius: 4px;
	background-color: ${(props) => props.selected && oc.blue[1]};
	&:focus {
		outline: none;
	}
`
