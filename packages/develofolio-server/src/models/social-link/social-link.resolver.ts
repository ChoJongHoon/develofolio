import {
	forwardRef,
	HttpException,
	HttpStatus,
	Inject,
	UseGuards,
} from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard'
import { PageService } from '../page/page.service'
import { CurrentUser } from '../user/decorator/current-user.decorator'
import { User } from '../user/user.entity'
import { SocialLinkType } from './models/social-link-type.enum'
import { SocialLink } from './models/social-link.entity'
import { SocialLinkService } from './social-link.service'

@Resolver()
export class SocialLinkResolver {
	constructor(
		private readonly socialLinkService: SocialLinkService,
		@Inject(forwardRef(() => PageService))
		private readonly pageService: PageService
	) {}

	@Mutation(() => SocialLink, { nullable: true })
	@UseGuards(GqlAuthGuard)
	async saveSocialLink(
		@CurrentUser() user: User,
		@Args('type', { type: () => SocialLinkType }) type: SocialLinkType,
		@Args('link', { type: () => String }) link: string
	) {
		const page = await this.pageService.findByUser(user.id)
		if (!page) {
			throw new HttpException('Page not found', HttpStatus.NOT_FOUND)
		}
		if (!link) {
			await this.socialLinkService.delete(page.id, type)
			return null
		}
		return await this.socialLinkService.upsert(page.id, type, link)
	}
}
