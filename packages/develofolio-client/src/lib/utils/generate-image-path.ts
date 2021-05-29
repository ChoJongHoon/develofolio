export const genereateImagePath = (path: string) => {
	return `https://${process.env.NEXT_PUBLIC_RESOURCE_DOMAIN}/images/${path}`
}

export const genereateProfileImagePath = (userId: string, filename: string) => {
	return genereateImagePath(`${userId}/profile/${filename}`)
}
