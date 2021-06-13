import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SocialLinkModule } from '../social-link/social-link.module'
import { Page } from './models/page.entity'
import { PageFieldResolver, PageResolver } from './page.resolver'
import { PageService } from './page.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Page]),
		forwardRef(() => SocialLinkModule),
	],
	providers: [PageResolver, PageFieldResolver, PageService],
	exports: [PageService],
})
export class PageModule {}
