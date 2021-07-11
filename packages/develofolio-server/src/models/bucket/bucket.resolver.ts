import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { User } from '../user/user.entity'
import { SignedUrlType } from './args/file-upload.args'
import { BucketService } from './bucket.service'
import path from 'path'
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard'

@Resolver()
export class BucketResolver {
	constructor(readonly bucketService: BucketService) {}

	@Query(() => SignedUrlType)
	@UseGuards(GqlAuthGuard)
	imageUploadPath(
		@CurrentUser() user: User,
		@Args('type', { type: () => String })
		type: string,
		@Args('filename', { type: () => String })
		filename: string
	): SignedUrlType {
		const contentType = this.bucketService.getContentType(filename)
		const uniqueFilename = this.bucketService.generateFilename(filename)

		const filePath = path.join('images', user.id, type, uniqueFilename)

		const uploadPath = this.bucketService.createUploadUrl(filePath, contentType)

		return {
			filename: uniqueFilename,
			uploadPath,
		}
	}
}
