import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { GithubOauthModule } from './github/github-oauth.module'
import { JwtAuthModule } from './jwt/jwt-auth.module'

@Module({
	imports: [PassportModule, GithubOauthModule, JwtAuthModule],
	providers: [],
	controllers: [],
})
export class AuthModule {}
