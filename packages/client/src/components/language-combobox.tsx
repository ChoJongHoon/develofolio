import { Select } from 'baseui/select'
import OpenColor from 'open-color'
import { borderColor, borderStyle } from 'polished'
import { LanguageType } from '~/graphql/document.generated'

const KOREAN_MAP: Record<LanguageType, string> = {
	[LanguageType.Ko]: '한국어',
	[LanguageType.En]: '영어',
	[LanguageType.Zh]: '중국어',
	[LanguageType.Ja]: '일본어',
	[LanguageType.De]: '독일어',
	[LanguageType.Fe]: '프랑스어',
	[LanguageType.Es]: '스페인어',
	[LanguageType.Ru]: '러시아어',
}

const Options = Object.values(LanguageType).map((item) => ({
	id: item,
	label: KOREAN_MAP[item],
}))

interface LanguageSelectProps {
	value?: LanguageType
	onChange: (value: LanguageType) => void | Promise<void>
}

export const LanguageSelect = ({ value, onChange }: LanguageSelectProps) => {
	return (
		<Select
			searchable={false}
			clearable={false}
			options={Options}
			valueKey="id"
			labelKey="label"
			value={Options.filter((option) => option.id === value)}
			onChange={({ value }) => {
				onChange(value[0].id as LanguageType)
			}}
			overrides={{
				ControlContainer: {
					style: ({ $isFocused }) => ({
						...($isFocused
							? {
									...borderColor(OpenColor.blue[7]),
									backgroundColor: OpenColor.gray[0],
							  }
							: {
									backgroundColor: OpenColor.gray[2],
									...borderColor(OpenColor.gray[2]),
							  }),
					}),
				},
				ValueContainer: {
					style: {
						backgroundColor: 'transparent',
					},
				},
				SelectArrow: {
					style: {
						backgroundColor: 'transparent',
						color: OpenColor.gray[5],
					},
				},
			}}
		></Select>
	)
}
