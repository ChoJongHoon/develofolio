import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window'
import { ILogo } from './types'
import Image from 'next/image'
import OpenColor from 'open-color'
import { StyleObject } from 'styletron-standard'
import { padding } from 'polished'
import { useStyletron } from 'styletron-react'

const ICON_SIZE = 40
const BOX_WIDTH = 320
const MAX_HEIGHT = 224

interface LogoPickerResultsProps {
	results: ILogo[]
	selectedIndex: number
	onChangeSelectedIndex: (index: number) => void
	onSelect: (logo: ILogo) => void
}

export const LogoPickerResults = ({
	results,
	selectedIndex,
	onChangeSelectedIndex,
	onSelect,
}: LogoPickerResultsProps) => {
	const columnCount = useMemo(() => Math.floor(BOX_WIDTH / ICON_SIZE), [])
	const rowCount = useMemo(
		() => Math.ceil(results.length / columnCount),
		[results, columnCount]
	)
	const gridHeight = useMemo(
		() => Math.min(rowCount * 40, MAX_HEIGHT),
		[rowCount]
	)
	const gridRef = useRef<Grid>(null)
	/**
	 * 현재 선택된 아이템으로 스크롤 이동
	 */
	useEffect(() => {
		gridRef.current?.scrollToItem({
			rowIndex: Math.floor(selectedIndex / columnCount),
		})
	}, [selectedIndex, columnCount])

	/**
	 * 검색어가 변경되면 selectedIndex 리셋
	 */
	useEffect(() => {
		onChangeSelectedIndex(0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [results])

	return (
		<Grid
			height={gridHeight}
			width={BOX_WIDTH}
			columnCount={columnCount}
			columnWidth={ICON_SIZE}
			rowCount={rowCount}
			rowHeight={ICON_SIZE}
			itemData={{
				columnCount,
				filteredLogos: results,
				selectedIndex,
				onChangeSelectedIndex,
				onSelect,
			}}
			ref={gridRef}
		>
			{Cell}
		</Grid>
	)
}

type ItemData = {
	columnCount: number
	filteredLogos: ILogo[]
	selectedIndex: number
	onSelect: (logo: ILogo) => void
	onChangeSelectedIndex: (index: number) => void
}

const Cell = ({
	columnIndex,
	data,
	rowIndex,
	style,
}: GridChildComponentProps<ItemData>) => {
	const [css] = useStyletron()
	const {
		columnCount,
		filteredLogos,
		selectedIndex,
		onChangeSelectedIndex,
		onSelect,
	} = data
	const singleColumnIndex = columnIndex + rowIndex * columnCount
	const logo = filteredLogos[singleColumnIndex]
	const selected = useMemo(
		() => selectedIndex === singleColumnIndex,
		[selectedIndex, singleColumnIndex]
	)
	const onMouseEnter = useCallback(() => {
		onChangeSelectedIndex(singleColumnIndex)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleColumnIndex])

	const onMouseDown = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
		(event) => {
			event.preventDefault()
			onSelect(logo)
		},
		[logo, onSelect]
	)

	return (
		<div style={style}>
			{logo && (
				<button
					key={logo.name}
					onMouseEnter={onMouseEnter}
					onMouseDown={onMouseDown}
					className={css(itemStyles(selected))}
				>
					<Image
						key={logo.name}
						src={`/logos/${logo.files[0]}`}
						width={24}
						height={24}
						layout="fixed"
						alt={logo.name}
					/>
				</button>
			)}
		</div>
	)
}

const itemStyles = (selected: boolean): StyleObject => ({
	width: `${ICON_SIZE}px`,
	height: `${ICON_SIZE}px`,
	...padding('0px'),
	cursor: 'pointer',
	border: 'none',
	borderRadius: '4px',
	backgroundColor: selected ? OpenColor.blue[1] : 'transparent',
	':focus': {
		outlineStyle: 'none',
	},
})
