import { Module } from '@nestjs/common'
import { BucketModule } from 'src/models/bucket/bucket.module'
import { UserModule } from 'src/models/user/user.module'
import { JwtAuthModule } from '../jwt/jwt-auth.module'
import { GithubOauthController } from './github-oauth.controller'
import { GithubOauthStrategy } from './github-oauth.strategy'

@Module({
	imports: [UserModule, JwtAuthModule, BucketModule],
	controllers: [GithubOauthController],
	providers: [GithubOauthStrategy],
})
export class GithubOauthModule {}
