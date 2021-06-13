import { compile, PathFunction } from 'path-to-regexp'

const cache: {
	[key in string]: PathFunction<Record<string, unknown>>
} = {}
const cacheLimit = 10000
let cacheCount = 0

function compilePath(path: string) {
	if (cache[path]) return cache[path]

	const generator = compile(path)

	if (cacheCount < cacheLimit) {
		cache[path] = generator
		cacheCount++
	}

	return generator
}

/**
 * Public API for generating a URL pathname from a path and parameters.
 */
export default function generatePath(path = '/', params = {}) {
	return path === '/' ? path : compilePath(path)(params)
}
