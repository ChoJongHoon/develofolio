import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { User } from '../user/user.entity'
import { UpdatePageInput } from './input/update-page.input'
import { Page } from './page.entity'
import { PageService } from './page.service'

@Resolver()
export class PageResolver {
	constructor(private readonly pageService: PageService) {}

	@Query(() => [String])
	async getPaths() {
		return this.pageService.getPaths()
	}

	@Query(() => Page)
	async getPageBySlug(@Args('slug', { type: () => String }) slug: string) {
		return this.pageService.findOneBySlug(slug)
	}

	@Mutation(() => Page)
	@UseGuards(GqlAuthGuard)
	async updatePage(
		@Args('fields') fields: UpdatePageInput,
		@CurrentUser() user: User
	) {
		return await this.pageService.update(user.pageId, fields)
	}

	@Mutation(() => Boolean)
	async checkDuplicatedSlug(
		@Args('slug', { type: () => String }) slug: string
	) {
		return await this.pageService.isDuplicatedSlug(slug)
	}
}
