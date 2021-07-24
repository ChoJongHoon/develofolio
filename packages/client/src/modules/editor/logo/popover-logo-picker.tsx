import { useCallback, useEffect, useState } from 'react'
import { useStyletron } from 'styletron-react'
import { ILogo } from './types'
import logos from 'public/logos.json'
import { logoIndex } from './logo-index'
import { border, padding } from 'polished'
import OpenColor from 'open-color'
import { LogoPickerResults } from './logo-picker-results'

interface PopoverLogoPickerProps {
	onLogoAdd: (logo: ILogo) => void
	onClose: () => void
}

export const PopoverLogoPicker = ({
	onLogoAdd,
	onClose,
}: PopoverLogoPickerProps) => {
	const [css] = useStyletron()
	const [value, setValue] = useState('')
	const [results, setResults] = useState(logos)
	const [selectedIndex, setSelectedIndex] = useState(0)
	const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
		(event) => {
			setValue(event.target.value)
		},
		[]
	)

	useEffect(() => {
		if (!value) {
			setResults(logos)
			return
		}
		logoIndex.search(value).then((res) => {
			setResults(res.map((item) => logos[item.index]))
		})
	}, [value])

	const onSelect = useCallback(() => {
		const selectedLogo = results[selectedIndex]
		onLogoAdd(selectedLogo)
		setValue('')
		setSelectedIndex(0)
	}, [onLogoAdd, results, selectedIndex])

	const onKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			const key = event.key
			const totalCount = results.length

			if (key === 'ArrowRight') {
				event.preventDefault()
				const next = selectedIndex + 1
				if (totalCount <= next) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'ArrowLeft') {
				event.preventDefault()
				const next = selectedIndex - 1
				if (next < 0) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'ArrowDown') {
				event.preventDefault()
				const next = selectedIndex + 8
				if (totalCount <= next) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'ArrowUp') {
				event.preventDefault()
				const next = selectedIndex - 8
				if (next < 0) {
					return
				}
				setSelectedIndex(next)
				return
			}
			if (key === 'Enter') {
				event.preventDefault()
				onSelect()
				return
			}
		},
		[onSelect, results.length, selectedIndex]
	)

	return (
		<div
			className={css({
				display: 'block',
				boxSizing: 'border-box',
				...padding('8px'),
				...border('1px', 'solid', OpenColor.gray[2]),
				overflow: 'hidden',
				flexDirection: 'column',
				borderRadius: '8px',
				backgroundColor: OpenColor.white,
			})}
		>
			<input
				className={css({
					backgroundColor: OpenColor.gray[1],
					...border('1px', 'solid', OpenColor.gray[2]),
					borderRadius: '4px',
					width: '100%',
					marginBottom: '16px',
					...padding('4px', '8px'),
					fontSize: '14px',
				})}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<div
				className={css({
					maxHeight: '240px',
					overflowY: 'auto',
					width: '320px',
				})}
			>
				<LogoPickerResults
					results={results}
					selectedIndex={selectedIndex}
					onChangeSelectedIndex={setSelectedIndex}
					onSelect={onSelect}
				/>
			</div>
		</div>
	)
}
