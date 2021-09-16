const FlexSearch = require('flexsearch')
const logos = require('../public/logos.json')
const fs = require('fs')

const logoIndex = FlexSearch.create({
	encode: 'advanced',
	tokenize: 'reverse',
	doc: {
		id: 'index',
		field: ['name', 'shortName'],
	},
})
// TODO: indexing 과정 빌드시 처리하도록 (Server Component)

logos.forEach(async (logo, i) => {
	await logoIndex.add({
		index: i,
		name: logo.name,
		shortName: logo.shortname,
	})
})

fs.writeFileSync('public/logos.index.json', logoIndex.export())
