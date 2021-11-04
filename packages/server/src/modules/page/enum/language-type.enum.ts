import { registerEnumType } from '@nestjs/graphql'

export enum LanguageType {
	KO = 'KO',
	EN = 'EN',
	ZH = 'ZH',
	JA = 'JA',
	DE = 'DE',
	FE = 'FE',
	ES = 'ES',
	RU = 'RU',
}

registerEnumType(LanguageType, {
	name: 'LanguageType',
	valuesMap: {
		KO: { description: '한국어' },
		EN: { description: '영어' },
		ZH: { description: '중국어' },
		JA: { description: '일본어' },
		DE: { description: '독일' },
		FE: { description: '프랑스' },
		ES: { description: '스페인' },
		RU: { description: '러시아' },
	},
})
