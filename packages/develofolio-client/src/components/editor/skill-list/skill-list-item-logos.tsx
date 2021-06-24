import { css } from '@emotion/react'
import OpenColor from 'open-color'
import React, { useCallback, useEffect, useState } from 'react'
import { Transforms } from 'slate'
import { ReactEditor, useSlateStatic } from 'slate-react'
import { Icon } from '~/components/base/icon'
import {
	CustomRenderElementProps,
	SkillListItemLogosElement,
} from '../custom-types'
import { LogoPickerResults } from '../logo/logo-picker-results'
import logos from 'public/logos.json'
import { Popover } from '~/components/base/popover/popover'
import { logoIndex } from '../logo/logo-index'
import { ILogo } from '../logo/types'
import Image from 'next/image'

export const SkillListItemLogos = ({
	attributes,
	children,
	element,
}: CustomRenderElementProps<SkillListItemLogosElement>) => {
	const editor = useSlateStatic()

	const onLogoRemove = useCallback(
		(index: number) => {
			const path = ReactEditor.findPath(editor, element)
			const newProperties: Partial<SkillListItemLogosElement> = {
				logos: element.logos.filter((_, i) => i !== index),
			}
			Transforms.setNodes(editor, newProperties, { at: path })
		},
		[editor, element]
	)

	const onLogoAdd = useCallback(
		(logo: ILogo) => {
			const path = ReactEditor.findPath(editor, element)
			const newProperties: Partial<SkillListItemLogosElement> = {
				logos: [
					...element.logos,
					{
						name: logo.name,
						url: logo.url,
						shortname: logo.shortname,
						file: logo.files[0],
					},
				],
			}
			Transforms.setNodes(editor, newProperties, { at: path })
		},
		[editor, element]
	)

	return (
		<div {...attributes} css={root}>
			<div contentEditable={false} css={list}>
				{element.logos.map((logo, index) => (
					<button
						key={logo.file}
						css={removeButton}
						onClick={() => {
							onLogoRemove(index)
						}}
					>
						<Image
							layout="fill"
							src={`/logos/${logo.file}`}
							css={imgStyles}
							alt={logo.name}
						/>
						<div css={removeButtonMask}>
							<Icon type="TrashLine" size={20} color={OpenColor.red[7]} />
						</div>
					</button>
				))}
				<Popover
					anchor={
						<button css={addButton}>
							<Icon type="Plus" size={16} color={OpenColor.gray[5]} />
						</button>
					}
					content={<LogoPicker onLogoAdd={onLogoAdd} />}
					placement="bottom-start"
				/>
			</div>
			{children}
		</div>
	)
}

interface LogoPickerProps {
	onLogoAdd: (logo: ILogo) => void
}

const LogoPicker = ({ onLogoAdd }: LogoPickerProps) => {
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
				const selectedLogo = results[selectedIndex]
				onLogoAdd(selectedLogo)
				return
			}
		},
		[onLogoAdd, results, selectedIndex]
	)

	return (
		<div css={logoPickerStyles}>
			<input
				css={inputStyles}
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<div css={gridWrapperStyles}>
				<LogoPickerResults
					results={results}
					selectedIndex={selectedIndex}
					onChangeSelectedIndex={setSelectedIndex}
					onSelect={onLogoAdd}
				/>
			</div>
		</div>
	)
}

const root = css`
	margin-bottom: 8px;
`
const removeButtonMask = css`
	position: absolute;
	top: 0px;
	left: 0px;
	bottom: 0px;
	right: 0px;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 4px;
	display: flex;
	justify-content: center;
	align-items: center;
	opacity: 0;
	transition: opacity 0.2s;
`

const removeButton = css`
	position: relative;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0px;
	display: inline-flex;

	&:hover .css-${removeButtonMask.name} {
		opacity: 1;
	}
`

const addButton = css`
	width: 24px;
	height: 24px;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0px;
	border-radius: 4px;
	opacity: 0;
	transition: background-color 0.2s, opacity 0.2s;
	&:hover {
		background-color: ${OpenColor.gray[1]};
	}
`

const list = css`
	display: flex;
	gap: 8px;
	&:hover .css-${addButton.name} {
		opacity: 1;
	}
`

const imgStyles = css`
	height: 24px;
	display: block;
`

const logoPickerStyles = css`
	display: block;
	box-sizing: border-box;
	padding: 8px;
	border: 1px solid ${OpenColor.gray[2]};
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

const inputStyles = css`
	background-color: ${OpenColor.gray[1]};
	border: 1px solid ${OpenColor.gray[2]};
	border-radius: 4px;
	width: 100%;
	margin-bottom: 16px;
	padding: 4px 8px;
	font-size: 14px;
`
