import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SocialLinkModule } from '../social-link/social-link.module'
import { UserModule } from '../user/user.module'
import { Page } from './page.entity'
import { PageFieldResolver, PageResolver } from './page.resolver'
import { PageService } from './page.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([Page]),
		forwardRef(() => SocialLinkModule),
		UserModule,
	],
	providers: [PageResolver, PageFieldResolver, PageService],
	exports: [PageService],
})
export class PageModule {}
