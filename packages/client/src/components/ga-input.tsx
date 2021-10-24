import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from './pimary-button'
import { PrimaryInput } from './primary-input'
import { FormControl } from 'baseui/form-control'

interface GaInputProps {
	defaultValue?: string
	onSubmit: (value: string) => void | Promise<void>
}

interface FormData {
	value: string
}

export const GaInput = ({ defaultValue = '', onSubmit }: GaInputProps) => {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { isValid, errors },
		trigger,
	} = useForm<FormData>({
		defaultValues: {
			value: defaultValue,
		},
		mode: 'onChange',
	})

	const { ref, ...rest } = register('value', {
		validate: (value) => {
			return value !== defaultValue
		},
		pattern: {
			value: /^G-[a-zA-Z0-9-]+$/,
			message: '올바른 측정 ID 를 입력해주세요.',
		},
	})

	useEffect(() => {
		trigger('value')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValue])

	return (
		<form
			onSubmit={handleSubmit(async ({ value }) => {
				setLoading(true)
				await onSubmit(value)
				setLoading(false)
			})}
		>
			<FormControl error={errors.value?.message}>
				<PrimaryInput
					inputRef={ref}
					{...rest}
					placeholder="G-XXXXXXXXXX"
					endEnhancer={() => (
						<PrimaryButton
							disabled={!isValid}
							overrides={{
								BaseButton: {
									style: {
										whiteSpace: 'nowrap',
									},
								},
							}}
							isLoading={loading}
							type="submit"
						>
							적용
						</PrimaryButton>
					)}
				/>
			</FormControl>
		</form>
	)
}
