import { Input, InputOverrides, InputProps } from 'baseui/input'
import { merge } from 'lodash'
import OpenColor from 'open-color'
import { borderStyle } from 'polished'

export const PrimaryInput = ({ overrides, ...props }: InputProps) => {
	return (
		<Input
			overrides={merge<InputOverrides, InputOverrides>(
				{
					Root: {
						style: ({ $isFocused }) => ({
							...borderStyle('none'),
							transitionProperty: 'box-shadow',
							transitionDuration: '0.2s',
							paddingRight: '0px',
							...($isFocused
								? {
										boxShadow: `0px 0px 0px 2px ${OpenColor.blue[7]}`,
										backgroundColor: OpenColor.gray[0],
								  }
								: {
										backgroundColor: OpenColor.gray[2],
								  }),
						}),
					},
					InputContainer: {
						style: {
							backgroundColor: 'transparent',
						},
					},
					Input: {
						style: {
							'::placeholder': {
								color: OpenColor.gray[5],
							},
						},
					},
					EndEnhancer: {
						style: {
							paddingRight: '0px',
							marginRight: '0px',
							backgroundColor: 'transparent',
						},
					},
				},
				overrides ?? {}
			)}
			{...props}
		/>
	)
}
