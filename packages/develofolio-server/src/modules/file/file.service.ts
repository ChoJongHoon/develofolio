import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { S3 } from 'aws-sdk'
import { ConfigType } from '@nestjs/config'
import { v4 as uuid } from 'uuid'
import { awsConfig } from 'src/config/aws.config'
import { File } from './file.entity'
import mimeTypes from 'mime-types'

@Injectable()
export class FileService {
	constructor(
		@InjectRepository(File)
		private readonly fileRepository: Repository<File>,
		@Inject(awsConfig.KEY)
		private readonly awsEnv: ConfigType<typeof awsConfig>
	) {}

	async findById(id: string) {
		return await this.fileRepository.findOne(id)
	}
	async findByIds(ids: readonly string[]) {
		return await this.fileRepository.findByIds([...ids])
	}

	async generateUploadUrl(key: string) {
		const s3 = new S3()

		return s3.getSignedUrl('putObject', {
			Bucket: this.awsEnv.bucket,
			Key: key,
			ContentType: this.getContentType(key),
			Expires: 60 * 60,
		})
	}

	async createFile(key: string, ownerId?: string, isPrivate = false) {
		return await this.fileRepository.save({
			key: key,
			ownerId,
			isPrivate,
		})
	}

	async deleteFile(id: string) {
		const file = await this.fileRepository.findOneOrFail(id)
		const s3 = new S3()
		await s3
			.deleteObject({
				Bucket: this.awsEnv.bucket,
				Key: file.key,
			})
			.promise()
		await this.fileRepository.delete(id)
	}

	hashFilename(filename: string) {
		return `${uuid()}-${filename}`
	}

	getContentType(filename: string) {
		const contentType = mimeTypes.lookup(filename)

		return contentType || ''
	}
}
