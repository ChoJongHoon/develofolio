import { Module } from '@nestjs/common'
import { PageModule } from '../../page/page.module'
import { UserModule } from '../../user/user.module'
import { JwtAuthModule } from '../jwt/jwt-auth.module'
import { FacebookOauthController } from './facebook-oauth.controller'
import { FacebookOauthStrategy } from './facebook-oauth.strategy'

@Module({
	imports: [UserModule, JwtAuthModule, PageModule],
	controllers: [FacebookOauthController],
	providers: [FacebookOauthStrategy],
})
export class FacebookOauthModule {}
