import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { PageModule } from '../page/page.module'
import { FacebookOauthModule } from './facebook/facebook-oauth.module'
import { GithubOauthModule } from './github/github-oauth.module'
import { GoogleOauthModule } from './google/google-oauth.module'
import { JwtAuthModule } from './jwt/jwt-auth.module'
import { AuthResolver } from './auth.resolver'
import { FileModule } from '../file/file.module'

@Module({
	imports: [
		PassportModule,
		GithubOauthModule,
		FacebookOauthModule,
		GoogleOauthModule,
		JwtAuthModule,
		UserModule,
		PageModule,
		FileModule,
	],
	providers: [AuthResolver],
	controllers: [],
})
export class AuthModule {}
