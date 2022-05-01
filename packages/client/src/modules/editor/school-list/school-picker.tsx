import { createPopper, Instance } from '@popperjs/core'
import { LabelMedium } from 'baseui/typography'
import OpenColor from 'open-color'
import { borderRadius, padding } from 'polished'
import { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { ReactEditor, useSlate } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { DevelofolioImage } from '~/components/develofolio-image'
import { GetSchoolsByCursorQuery } from '~/graphql/document.generated'
import {
	schoolPickerSelectedIndexState,
	schoolPickerTargetState,
} from '../editor.atoms'

interface SchoolPickerProps {
	schools: GetSchoolsByCursorQuery['getSchoolsByCursor']['edges']
	onSelect: () => void
}

export const SchoolPicker = ({ schools, onSelect }: SchoolPickerProps) => {
	const editor = useSlate()
	const [css] = useStyletron()
	const target = useRecoilValue(schoolPickerTargetState)
	const [selectedIndex, setSelectedIndex] = useRecoilState(
		schoolPickerSelectedIndexState
	)

	const ref = useRef<HTMLDivElement>(null)
	const instance = useRef<Instance>()

	useEffect(() => {
		const element = ref.current
		if (!element || !target) {
			instance.current?.destroy()
			return
		}
		const domRange = ReactEditor.toDOMRange(editor, target)
		if (instance.current) {
			instance.current.destroy()
		}
		instance.current = createPopper(domRange, element, {
			placement: 'bottom-start',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 8],
					},
				},
				{
					name: 'flip',
					options: {
						flipVariations: false,
						padding: 8,
					},
				},
				{
					name: 'preventOverflow',
					options: {
						padding: 8,
					},
				},
			],
		})
		return () => {
			instance.current?.destroy()
		}
	}, [editor, target])

	return (
		<div
			ref={ref}
			className={css({
				...padding('8px', '0px'),
				backgroundColor: 'white',
				boxShadow: '0 0.5rem 1.5rem rgb(0 0 0 / 20%)',
				...borderRadius('top', '8px'),
				...borderRadius('bottom', '8px'),
				width: '280px',
				position: 'absolute',
				top: '-1000px',
				left: '-1000px',
				maxHeight: '320px',
				overflowY: 'auto',
			})}
			onClick={onSelect}
		>
			{schools?.map((edge, index) => (
				<div
					key={edge.node.id}
					className={css({
						...padding('8px'),
						display: 'flex',
						alignItems: 'center',
						cursor: 'pointer',
						backgroundColor:
							selectedIndex === index ? OpenColor.gray[1] : undefined,
					})}
					onMouseEnter={() => {
						setSelectedIndex(index)
					}}
				>
					<div
						className={css({
							marginRight: '8px',
							flexGrow: 0,
							flexShrink: 0,
							flexBasis: '32px',
						})}
					>
						<DevelofolioImage
							src={edge.node.logo}
							width={32}
							height={32}
							alt={edge.node.name}
						/>
					</div>
					<div
						className={css({
							flexGrow: 1,
						})}
					>
						<LabelMedium>{edge.node.name}</LabelMedium>
					</div>
				</div>
			))}
		</div>
	)
}
