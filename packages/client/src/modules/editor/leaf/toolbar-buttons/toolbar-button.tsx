import classNames from 'classnames'
import OpenColor from 'open-color'
import { padding } from 'polished'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { useStyletron } from 'styletron-react'
import { Icon, IconType } from '~/components/icon'

interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isActive: boolean
	icon: IconType
	iconColor?: string
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
	({ className, isActive, icon, iconColor, ...props }, ref) => {
		const [css] = useStyletron()

		return (
			<button
				ref={ref}
				className={classNames(
					css({
						...padding('4px'),
						backgroundColor: isActive ? OpenColor.gray[2] : 'transparent',
						border: 'none',
						display: 'inline-flex',
						cursor: 'pointer',
						borderRadius: '4px',
						[':hover']: {
							backgroundColor: isActive ? OpenColor.gray[3] : OpenColor.gray[2],
						},
					}),
					className
				)}
				{...props}
			>
				<Icon
					type={icon}
					size={24}
					color={iconColor || isActive ? OpenColor.gray[8] : OpenColor.gray[6]}
				/>
			</button>
		)
	}
)
