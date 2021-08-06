export const generateFileUrl = (
	key: string,
	d?:
		| number
		| {
				width: number
				height: number
		  }
) => {
	const splited = key.split('/')

	if (splited[0] === 'images') {
		let url = process.env.NEXT_PUBLIC_IMAGES_HOST
		if (url.charAt(url.length - 1) !== '/') {
			url += '/'
		}
		url += splited.slice(1).join('/')

		if (d) {
			url += '?d='
			if (typeof d === 'number') {
				url += `${d * 2}x${d * 2}`
			} else {
				url += `${d.width * 2}x${d.height * 2}`
			}
		}
		return url
	}

	return key
}
