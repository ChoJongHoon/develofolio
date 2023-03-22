import { UseGuards } from '@nestjs/common'
import { Mutation, Resolver } from '@nestjs/graphql'
import { FileService } from '../file/file.service'
import { PageService } from '../page/page.service'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'
import { GqlAuthGuard } from './graphql/gql-auth.guard'

@Resolver()
export class AuthResolver {
	constructor(
		private readonly pageService: PageService,
		private readonly userService: UserService,
		private readonly fileService: FileService
	) {}

	@Mutation(() => Boolean)
	@UseGuards(GqlAuthGuard)
	async deleteAccount(@CurrentUser() user: User) {
		await this.fileService.deleteUserFiles(user.id)
		await this.userService.remove(user.id)
		await this.pageService.remove(user.pageId)

		return true
	}
}
