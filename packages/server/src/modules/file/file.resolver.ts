import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/graphql/gql-auth.decorator'
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard'
import { User } from '../user/user.entity'
import { UploadUrl } from './dto/upload-url.dto'
import { UploadType } from './enum/upload-type.enum'
import { File } from './file.entity'
import { FileService } from './file.service'

@Resolver()
export class FileResolver {
	constructor(private readonly fileService: FileService) {}

	@Query(() => UploadUrl)
	@UseGuards(GqlAuthGuard)
	async generateUploadPath(
		@Args({ name: 'filename', type: () => String }) filename: string,
		@Args({ name: 'type', type: () => UploadType }) type: UploadType,
		@CurrentUser() user: User
	): Promise<UploadUrl> {
		const path =
			type === UploadType.PROFILE
				? `images/${user.id}/profile/`
				: type === UploadType.PROJECT
				? `images/${user.id}/project/`
				: type === UploadType.SCHOOL
				? `images/${user.id}/school/`
				: ''
		const key = path + this.fileService.hashFilename(filename)
		const url = await this.fileService.generateUploadUrl(key)

		return {
			url,
			key,
		}
	}

	@Mutation(() => File)
	@UseGuards(GqlAuthGuard)
	async createFile(
		@Args({ name: 'key', type: () => String }) key: string,
		@Args({ name: 'isPrivate', type: () => Boolean, defaultValue: false })
		isPrivate = false,
		@CurrentUser() user: User
	): Promise<File> {
		return await this.fileService.createFile(key, user.id, isPrivate)
	}
}
