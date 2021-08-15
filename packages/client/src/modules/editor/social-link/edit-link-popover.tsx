import { useStyletron } from 'styletron-react'
import { padding } from 'polished'
import OpenColor from 'open-color'

interface EditLinkPopoverProps {
	onChange: (value: string) => void
	onClose?: () => void
	defaultValue?: string | null
}

export const EditLinkPopover = ({
	onChange,
	onClose,
	defaultValue,
}: EditLinkPopoverProps) => {
	const [css] = useStyletron()

	return (
		<div
			className={css({
				backgroundColor: OpenColor.white,
				...padding('8px'),
			})}
		>
			<input
				className={css({
					fontSize: '18px',
				})}
				defaultValue={defaultValue ?? ''}
				onChange={(event) => {
					onChange(event.target.value)
				}}
				onKeyDown={(event) => {
					if (event.key === 'Enter') {
						onClose?.()
						event.preventDefault()
					}
				}}
			/>
		</div>
	)
}
