import { useStyletron } from 'styletron-react'
import { padding } from 'polished'
import OpenColor from 'open-color'

interface EditLinkPopoverProps {
	onChange: (value: string) => void
	defaultValue?: string | null
}

export const EditLinkPopover = ({
	onChange,
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
				defaultValue={defaultValue ?? ''}
				onChange={(event) => {
					onChange(event.target.value)
				}}
			/>
		</div>
	)
}
