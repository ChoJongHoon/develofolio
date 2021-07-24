import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { User } from '../user/user.entity'
import { Page } from './models/page.entity'
import { PageService } from './page.service'

@Resolver()
export class PageResolver {
	constructor(private readonly pageService: PageService) {}

	@Query(() => Page, { nullable: true })
	@UseGuards(GqlAuthGuard)
	async myPage(@CurrentUser() user: User) {
		return await this.pageService.findByUser(user.id)
	}

	@Mutation(() => Page)
	@UseGuards(GqlAuthGuard)
	async createPage(
		@CurrentUser() user: User,
		@Args('slug', { type: () => String }) slug: string,
		@Args('initialContent', { type: () => GraphQLJSON }) initialContent: any
	) {
		return await this.pageService.create(user.id, slug, initialContent)
	}

	@Mutation(() => Page)
	@UseGuards(GqlAuthGuard)
	async savePage(
		@CurrentUser() user: User,
		@Args('content', { type: () => GraphQLJSON }) content: any
	) {
		return await this.pageService.save(user.id, content)
	}
}
