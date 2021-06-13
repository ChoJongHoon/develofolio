import { forwardRef, Inject, UseGuards } from '@nestjs/common'
import {
	Args,
	Mutation,
	Parent,
	Query,
	ResolveField,
	Resolver,
} from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard'
import { SocialLink } from '../social-link/models/social-link.entity'
import { SocialLinkService } from '../social-link/social-link.service'
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

	@Mutation(() => Page)
	@UseGuards(GqlAuthGuard)
	async updatePageAvatar(
		@CurrentUser() user: User,
		@Args('avatar', { type: () => String }) avatar: string
	) {
		return await this.pageService.updateByUserId(user.id, { avatar })
	}

	@Mutation(() => Page)
	@UseGuards(GqlAuthGuard)
	async removePageAvatar(@CurrentUser() user: User) {
		return await this.pageService.updateByUserId(user.id, { avatar: null })
	}
}

@Resolver(Page)
export class PageFieldResolver {
	constructor(
		@Inject(forwardRef(() => SocialLinkService))
		private readonly socialLinkService: SocialLinkService
	) {}

	@ResolveField(() => [SocialLink])
	async socialLinks(@Parent() page: Page) {
		return await this.socialLinkService.findByPageId(page.id)
	}
}
