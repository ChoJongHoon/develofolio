import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { FacebookOauthModule } from './facebook/facebook-oauth.module'
import { GithubOauthModule } from './github/github-oauth.module'
import { GoogleOauthModule } from './google/google-oauth.module'
import { JwtAuthModule } from './jwt/jwt-auth.module'

@Module({
	imports: [
		PassportModule,
		GithubOauthModule,
		FacebookOauthModule,
		GoogleOauthModule,
		JwtAuthModule,
	],
	providers: [],
	controllers: [],
})
export class AuthModule {}
