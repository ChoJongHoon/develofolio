export const generateImagePath = (path: string) => {
	return `https://${process.env.NEXT_PUBLIC_RESOURCE_DOMAIN}/${path}`
}
