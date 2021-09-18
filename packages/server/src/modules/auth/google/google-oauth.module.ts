import { Module } from '@nestjs/common'
import { PageModule } from '../../page/page.module'
import { UserModule } from '../../user/user.module'
import { JwtAuthModule } from '../jwt/jwt-auth.module'
import { GoogleOauthController } from './google-oauth.controller'
import { GoogleOauthStrategy } from './google-oauth.strategy'

@Module({
	imports: [UserModule, JwtAuthModule, PageModule],
	controllers: [GoogleOauthController],
	providers: [GoogleOauthStrategy],
})
export class GoogleOauthModule {}
