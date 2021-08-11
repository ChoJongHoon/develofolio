import { UseGuards } from '@nestjs/common'
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard'
import { Page } from '../page/page.entity'
import { PageService } from '../page/page.service'
import { CurrentUser } from './decorator/current-user.decorator'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
		private readonly pageService: PageService
	) {}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: User) {
		return await this.userService.findOne(user.id)
	}

	@ResolveField(() => Page)
	async page(@Parent() user: User) {
		return this.pageService.findOne(user.pageId)
	}
}
