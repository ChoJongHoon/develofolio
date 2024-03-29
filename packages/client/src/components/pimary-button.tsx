import { Button, ButtonOverrides, ButtonProps } from 'baseui/button'
import OpenColor from 'open-color'
import { forwardRef } from 'react'
import { useOverrides } from '../hooks/use-overrides'

export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, overrides, ...props }, ref) => {
		return (
			<Button
				overrides={useOverrides<ButtonOverrides>(
					{
						BaseButton: {
							style: {
								backgroundColor: OpenColor.blue[7],
								':hover': {
									backgroundColor: OpenColor.blue[6],
								},
								':active': {
									backgroundColor: OpenColor.blue[8],
								},
								':disabled': {
									backgroundColor: OpenColor.gray[2],
									':hover': {
										backgroundColor: OpenColor.gray[2],
									},
									':active': {
										backgroundColor: OpenColor.gray[2],
									},
								},
							},
						},
					},
					overrides
				)}
				{...props}
				ref={ref}
			>
				{children}
			</Button>
		)
	}
)
