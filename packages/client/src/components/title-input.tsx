import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PrimaryButton } from './pimary-button'
import { PrimaryInput } from './primary-input'

interface TitleInputProps {
	defaultValue?: string
	onSubmit: (value: string) => void | Promise<void>
}

interface FormData {
	value: string
}

export const TitleInput = ({
	defaultValue = '',
	onSubmit,
}: TitleInputProps) => {
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { isValid },
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
			<PrimaryInput
				inputRef={ref}
				{...rest}
				placeholder="username | DeveloFolio"
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
		</form>
	)
}
