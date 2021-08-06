import { Handler, Context, Callback, CloudFrontResponseEvent } from 'aws-lambda'
import AWS from 'aws-sdk'
import querystring from 'query-string'
import sharp from 'sharp'
import { imageSize as sizeof } from 'image-size'

const REGION = 'ap-northeast-2'

const isValidFormat = (format: string): format is keyof sharp.FormatEnum =>
	Object.keys(sharp.format).includes(format)

const S3 = new AWS.S3({ region: REGION })

export const resize: Handler<CloudFrontResponseEvent> = async (
	event,
	context: Context,
	callback: Callback
) => {
	console.log(`event`, JSON.stringify(event))

	const response = event.Records[0].cf.response
	const request = event.Records[0].cf.request

	console.log('Response status code :%s', response.status)

	const params = querystring.parse(request.querystring)
	const origin = request.origin?.s3

	if (!origin) {
		throw new Error('origin이 존재하지 않습니다.')
	}

	const bucketName = origin.domainName.split('.')[0]
	const defaultPath =
		origin.path.length >= 1 && origin.path[0] === '/'
			? origin.path.slice(1)
			: origin.path

	console.log(`d`, params.d)
	// https://images.example.com?d=100x100 의 형태가 아닐경우에는 원본 이미지를 반환합니다.
	if (!(typeof params.d === 'string')) {
		console.log(`Querystring d doesn't exsist.`)
		callback(null, response)
		return
	}

	const uri = decodeURI(request.uri)
	const imageSize = params.d.split('x')
	const width = parseInt(imageSize[0])
	const height = parseInt(imageSize[1])
	const matchedUri = uri.match(/\/(.*)\.(.*)/)
	console.log(`matchedUri`, matchedUri)
	if (!matchedUri) {
		console.log(`URI format is invalid.`)
		callback(null, response)
		return
	}
	const [, imageName, extension] = matchedUri
	const lowerExtension = extension.toLowerCase()

	if (lowerExtension === 'gif' || lowerExtension === 'svg') {
		callback(null, response)
		return
	}

	const requiredFormat = lowerExtension == 'jpg' ? 'jpeg' : lowerExtension
	const originalKey =
		(defaultPath ? defaultPath + '/' : '') + imageName + '.' + extension

	console.log(`originalKey`, originalKey)
	console.log(`bucketName`, bucketName)

	try {
		const s3Object = await S3.getObject({
			Bucket: bucketName,
			Key: originalKey,
		}).promise()

		const size = sizeof(s3Object.Body as string | Buffer)
		console.log(`size`, size)
		// 원본 이미지의 크기가 더 작을 경우에는 원본 이미지를 반환합니다.
		if ((size.width || 0) <= width || (size.height || 0) <= height) {
			callback(null, response)
			return
		}

		// 원본 이미지가 올바르지 않은 포맷이라면 원본을 반환
		if (!isValidFormat(requiredFormat)) {
			callback(null, response)
			return
		}

		const resizedImage = await sharp(s3Object.Body as string | Buffer)
			.resize(width, height)
			.toFormat(requiredFormat)
			.toBuffer()

		const resizedImageByteLength = Buffer.byteLength(resizedImage, 'base64')
		console.log('byteLength: ', resizedImageByteLength)

		// `response.body`가 변경된 경우 1MB까지만 허용됩니다.
		if (resizedImageByteLength >= 1 * 1024 * 1024) {
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
	} catch (error) {
		console.error(error)
		return callback(error)
	}
}
