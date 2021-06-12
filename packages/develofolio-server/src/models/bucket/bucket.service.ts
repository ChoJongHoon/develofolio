import { HttpService, Injectable } from '@nestjs/common'
import { S3 } from 'aws-sdk'
import mimeTypes from 'mime-types'
import tmp from 'tmp'
import fs from 'fs'
import { v4 as uuid } from 'uuid'

@Injectable()
export class BucketService {
	s3: S3

	constructor(private readonly httpService: HttpService) {
		this.s3 = new S3({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		})
	}

	async syncProfileImage(url: string, id: string) {
		const response = await this.httpService
			.get(encodeURI(url), {
				responseType: 'stream',
			})
			.toPromise()

		const contentType = response.headers['content-type']
		const extension = mimeTypes.extension(contentType)

		const tmpObject = tmp.fileSync()
		const writeStream = fs.createWriteStream(tmpObject.name)
		response.data.pipe(writeStream)

		await new Promise<void>((resolve) => {
			writeStream.on('finish', () => {
				resolve()
			})
		})

		const stream = fs.createReadStream(tmpObject.name)

		const filename = `${uuid()}.${extension}`
		const key = `images/${id}/profile/${filename}`

		// upload
		await this.s3
			.upload({
				Bucket: process.env.AWS_S3_BUCKET,
				Key: key,
				Body: stream,
				ContentType: contentType,
			})
			.promise()

		tmpObject.removeCallback()

		return { filename }
	}

	getContentType(filename: string) {
		const contentType = mimeTypes.lookup(filename)

		return contentType || ''
	}

	createUploadUrl(path: string, contentType?: string) {
		return this.s3.getSignedUrl('putObject', {
			Bucket: process.env.AWS_S3_BUCKET,
			Key: path,
			ContentType: contentType,
			Expires: 60 * 60,
		})
	}

	generateFilename(filename: string) {
		const id = uuid()
		const extention = filename
			.substr(filename.lastIndexOf('.') + 1)
			.toLowerCase()

		return `${id}.${extention}`
	}
}
