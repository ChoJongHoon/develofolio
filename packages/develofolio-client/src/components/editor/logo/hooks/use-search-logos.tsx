import { useEffect, useState } from 'react'
import FlexSearch from 'flexsearch'
import logos from 'public/logos.json'

const index = FlexSearch.create<{
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
	index.add({ index: i, name: logo.name, shortName: logo.shortname })
})

const useSearchLogos = (keyword: string) => {
	console.log(`keyword`, keyword)
	const [result, setResult] = useState(logos)
	useEffect(() => {
		if (!keyword) {
			setResult(logos)
			return
		}
		index.search(keyword).then((res) => {
			setResult(res.map((item) => logos[item.index]))
		})
	}, [keyword])

	return result
}

export default useSearchLogos
