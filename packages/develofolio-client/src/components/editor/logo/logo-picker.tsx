import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import logos from 'public/logos.json'
import Image from 'next/image'
import oc from 'open-color'
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window'
import { css } from '@emotion/react'
import { Portal } from '~/components/base/portal'
import { ReactEditor, useSlate, useSlateStatic } from 'slate-react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { setSelectedIndex, setShowIconPicker } from '../editor.reducer'
import { Transforms } from 'slate'
import { insertLogo } from './insert-logo'

const ICON_SIZE = 40
const BOX_WIDTH = 320
const MAX_HEIGHT = 224

export default function LogoPicker() {
	const ref = useRef<HTMLDivElement>(null)
	const editor = useSlate()
	const dispatch = useDispatch()
	const { selectedIndex, show, target, results } = useSelector(
		(state) => state.editor.iconPicker,
		shallowEqual
	)

	useEffect(() => {
		const element = ref.current
		if (!element || !target || results.length === 0) {
			dispatch(setShowIconPicker(false))
			return
		}
		dispatch(setShowIconPicker(true))
		const domRange = ReactEditor.toDOMRange(editor, target)
		const rect = domRange.getBoundingClientRect()
		element.style.display = 'block'
		element.style.top = `${rect.top + window.pageYOffset + rect.height}px`
		element.style.left = `${rect.left + window.pageXOffset}px`
	}, [dispatch, editor, results.length, target])

	useEffect(() => {
		const element = ref.current
		if (element && !show) {
			element.style.display = 'none'
		}
	}, [show])

	const columnCount = useMemo(() => Math.floor(BOX_WIDTH / ICON_SIZE), [])
	const rowCount = useMemo(() => Math.ceil(results.length / columnCount), [
		results,
		columnCount,
	])
	const gridHeight = useMemo(() => Math.min(rowCount * 40, MAX_HEIGHT), [
		rowCount,
	])

	/**
	 * 검색어가 변경되면 selectedIndex 리셋
	 */
	useEffect(() => {
		setSelectedIndex(0)
	}, [results])

	const gridRef = useRef<Grid>(null)
	/**
	 * 현재 선택된 아이템으로 스크롤 이동
	 */
	useEffect(() => {
		gridRef.current?.scrollToItem({
			rowIndex: Math.floor(selectedIndex / columnCount),
		})
	}, [selectedIndex, columnCount])

	return (
		<Portal>
			<div ref={ref} css={boxStyles}>
				<div css={gridWrapperStyles}>
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
						}}
						ref={gridRef}
					>
						{Cell}
					</Grid>
				</div>
			</div>
		</Portal>
	)
}

type ItemData = {
	columnCount: number
	filteredLogos: typeof logos
	selectedIndex: number
}

const Cell = ({
	columnIndex,
	data,
	rowIndex,
	style,
}: GridChildComponentProps<ItemData>) => {
	const editor = useSlateStatic()
	const dispatch = useDispatch()
	const target = useSelector((state) => state.editor.iconPicker.target)
	const { columnCount, filteredLogos, selectedIndex } = data
	const singleColumnIndex = columnIndex + rowIndex * columnCount
	const logo = filteredLogos[singleColumnIndex]
	const selected = useMemo(() => selectedIndex === singleColumnIndex, [
		selectedIndex,
		singleColumnIndex,
	])
	const onMouseEnter = useCallback(() => {
		dispatch(setSelectedIndex(singleColumnIndex))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [singleColumnIndex])

	const onMouseDown = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
		(event) => {
			event.preventDefault()
			if (target) {
				Transforms.select(editor, target)
			}
			insertLogo(editor, {
				file: logo.files[0],
				name: logo.name,
				shortname: logo.shortname,
				url: logo.url,
			})
		},
		[editor, logo, target]
	)

	return (
		<div style={style}>
			{logo && (
				<button
					key={logo.name}
					onMouseEnter={onMouseEnter}
					onMouseDown={onMouseDown}
					css={itemStyles(selected)}
				>
					<Image
						key={logo.name}
						src={`/logos/${logo.files[0]}`}
						width={24}
						height={24}
						layout="fixed"
					/>
				</button>
			)}
		</div>
	)
}

const boxStyles = css`
	display: none;
	box-sizing: border-box;
	position: absolute;
	padding: 8px;
	border: 1px solid ${oc.gray[2]};
	overflow: hidden;
	flex-direction: column;
	border-radius: 8px;
	background-color: white;
`

const gridWrapperStyles = css`
	max-height: 240px;
	overflow-y: auto;
	width: 320px;
`

const itemStyles = (selected: boolean) => css`
	width: ${ICON_SIZE}px;
	height: ${ICON_SIZE}px;
	padding: 0px;
	cursor: pointer;
	background-color: transparent;
	border: none;
	border-radius: 4px;
	background-color: ${selected && oc.blue[1]};
	&:focus {
		outline: none;
	}
`
