import Image, { ImageLoader, ImageProps } from 'next/image'

const loader: ImageLoader = ({ src, width, quality }) => {
	const url = new URL(`${process.env.NEXT_PUBLIC_IMAGES_HOST}/${src}`)

	url.searchParams.set('w', width.toString())
	if (quality) {
		url.searchParams.set('q', quality.toString())
	}

	return url.toString()
}

export const DevelofolioImage = ({ alt, ...props }: ImageProps) => {
	return <Image alt={alt} loader={loader} {...props} />
}
