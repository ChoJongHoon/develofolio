import { Handler, CloudFrontResponseEvent } from 'aws-lambda'
import AWS from 'aws-sdk'
import querystring from 'querystring'
import sharp from 'sharp'
import { imageSize as sizeof } from 'image-size'

const REGION = 'ap-northeast-2'
const BUCKET = 'develofolio-storage-v2'

const VALID_FORMAT: Array<keyof sharp.FormatEnum> = [
	'jpg',
	'jpeg',
	'png',
	'webp',
]

const isValidFormat = (format: any): format is keyof sharp.FormatEnum =>
	typeof format === 'string' &&
	VALID_FORMAT.includes(format as keyof sharp.FormatEnum)

const isValidFit = (fit: any): fit is keyof sharp.FitEnum =>
	typeof fit === 'string' && Object.keys(sharp.fit).includes(fit)

const s3 = new AWS.S3({ region: REGION })

export const resize: Handler<CloudFrontResponseEvent> = async (
	event,
	_context,
	callback
) => {
	console.log(`event`, JSON.stringify(event))

	const { response, request } = event.Records[0].cf

	console.log('Response status code :%s', response.status)

	const params = querystring.parse(request.querystring)

	if (Object.keys(params).length === 0) {
		return callback(null, response)
	}

	// w=100&h=100&t=cover&q=100(&f=webp)
	const widthMatch = typeof params.w === 'string' ? Number(params.w) : undefined
	const heightMatch =
		typeof params.h === 'string' ? Number(params.h) : undefined
	const typeMatch = isValidFit(params.t) ? params.t : undefined
	const qualityMatch =
		typeof params.q === 'string' ? Number(params.q) : undefined
	const formatMatch = params.f === 'webp' ? 'webp' : undefined

	// read the S3 key from the path variable.
	// assets/images/sample.jpeg
	const key = decodeURIComponent(request.uri).substring(1)

	let originalFormat = key.match(/(.*)\.(.*)/)?.[2].toLowerCase()
	if (originalFormat === 'jpg') {
		originalFormat = 'jpeg'
	}

	if (!isValidFormat(originalFormat)) {
		console.log(`Not supported format: `, originalFormat)
		return callback(null, response)
	}

	const requiredFormat = formatMatch ?? originalFormat

	try {
		const s3Object = await s3
			.getObject({
				Bucket: BUCKET,
				Key: key,
			})
			.promise()
		const size = sizeof(s3Object.Body as string | Buffer)

		const width =
			widthMatch && widthMatch < (size.width ?? 0) ? widthMatch : undefined
		const height =
			heightMatch && heightMatch < (size.height ?? 0) ? heightMatch : undefined
		const quality = qualityMatch

		let resizedImage = await sharp(s3Object.Body as string | Buffer)
			.rotate()
			.resize({
				width,
				height,
				fit: typeMatch,
			})
			.toFormat(requiredFormat, { quality })
			.toBuffer()

		const resizedImageByteLength = Buffer.byteLength(resizedImage, 'base64')

		// `response.body`가 변경된 경우 1MB까지만 허용됩니다.
		if (resizedImageByteLength >= 1 * 1024 * 1024) {
			console.log('byteLength: ', resizedImageByteLength)
			return callback(null, response)
		}

		response.status = '200'
		response.headers['content-type'] = [
			{ key: 'Content-Type', value: 'image/' + requiredFormat },
		]

		return callback(null, {
			...response,
			body: resizedImage.toString('base64'),
			bodyEncoding: 'base64',
		})
	} catch (error: any) {
		console.error(error)
		return callback(error)
	}
}
