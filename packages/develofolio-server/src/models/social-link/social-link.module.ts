import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageModule } from '../page/page.module'
import { SocialLink } from './models/social-link.entity'
import { SocialLinkResolver } from './social-link.resolver'
import { SocialLinkService } from './social-link.service'

@Module({
	imports: [
		TypeOrmModule.forFeature([SocialLink]),
		forwardRef(() => PageModule),
	],
	providers: [SocialLinkService, SocialLinkResolver],
	exports: [SocialLinkService],
})
export class SocialLinkModule {}
