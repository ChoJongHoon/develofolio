import FlexSearch from 'flexsearch'
import logos from 'public/logos.json'

export const logoIndex = FlexSearch.create<{
	index: number
	name: string
	shortName: string
}>({
	encode: 'advanced',
	tokenize: 'reverse',
	cache: true,
	async: true,
	doc: {
		id: 'index',
		field: ['name', 'shortName'],
	},
})

// TODO: indexing 과정 빌드시 처리하도록 (Server Component)
logos.forEach((logo, i) => {
	logoIndex.add({ index: i, name: logo.name, shortName: logo.shortname })
})
