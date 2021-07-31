import { Module } from '@nestjs/common'
import { UserModule } from '../../user/user.module'
import { JwtAuthModule } from '../jwt/jwt-auth.module'
import { GithubOauthController } from './github-oauth.controller'
import { GithubOauthStrategy } from './github-oauth.strategy'

@Module({
	imports: [UserModule, JwtAuthModule],
	controllers: [GithubOauthController],
	providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
