import { StatefulTooltip } from 'baseui/tooltip'
import { omit } from 'lodash'
import OpenColor from 'open-color'
import { borderRadius, borderStyle, padding } from 'polished'
import { Text, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import { useStyletron } from 'styletron-react'
import { Icon } from '~/components/icon'
import { ToolbarButton } from './toolbar-button'
import { getSelectedText } from '../utils'

const colorEntries = Object.entries(omit(OpenColor, 'white', 'black'))

export const FontColorButton = () => {
	const [css] = useStyletron()
	const editor = useSlate()
	const node = getSelectedText(editor)
	const color = node?.color
	return (
		<StatefulTooltip
			overrides={{
				Body: {
					style: {
						backgroundColor: OpenColor.gray[0],
						boxShadow: '0 0.5rem 1.5rem rgb(0 0 0 / 20%)',
						...borderRadius('top', '8px'),
						...borderRadius('bottom', '8px'),
					},
				},
				Inner: {
					style: {
						backgroundColor: 'transparent',
						...padding('4px'),
						display: 'flex',
						gap: '4px',
					},
				},
			}}
			content={() => (
				<div
					className={css({
						display: 'grid',
						gridTemplateColumns: 'repeat(7, 1fr)',
						gap: '4px',
					})}
				>
					<button
						key="remove"
						className={css({
							display: 'flex',
							...padding('0px'),
							...borderStyle('none'),
							backgroundColor: 'transparent',
							cursor: 'pointer',
						})}
						onMouseDown={(event) => {
							event.preventDefault()
							Transforms.setNodes(
								editor,
								{ color: undefined },
								{ match: Text.isText, split: true }
							)
						}}
					>
						<Icon type="TrashLine" color={OpenColor.red[6]} size={24} />
					</button>
					{colorEntries.map(([key, value]) => (
						<button
							key={key}
							className={css({
								width: '24px',
								height: '24px',
								backgroundColor: value[6],
								...borderRadius('top', '4px'),
								...borderRadius('bottom', '4px'),
								...borderStyle('none'),
								cursor: 'pointer',
							})}
							onMouseDown={(event) => {
								event.preventDefault()
								Transforms.setNodes(
									editor,
									{ color: key as keyof OpenColor },
									{ match: Text.isText, split: true }
								)
							}}
						/>
					))}
				</div>
			)}
			triggerType="click"
			placement="bottom"
			focusLock={false}
			autoFocus={false}
		>
			<ToolbarButton
				icon="FontColor"
				color={color ? OpenColor[color][6] : undefined}
				isActive={Boolean(color)}
			/>
		</StatefulTooltip>
	)
}
