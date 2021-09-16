import FlexSearch from 'flexsearch'
import index from 'public/logos.index.json'

export const logoIndex = FlexSearch.create<{
	index: number
	name: string
	shortName: string
}>({
	encode: 'advanced',
	tokenize: 'reverse',
	doc: {
		id: 'index',
		field: ['name', 'shortName'],
	},
})

logoIndex.import(JSON.stringify(index))
