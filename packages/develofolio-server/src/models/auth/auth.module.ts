import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { BucketModule } from '../bucket/bucket.module'
import { UserModule } from '../user/user.module'
import AuthController from './auth.controller'
import { AuthService } from './auth.service'
import { GithubStrategy } from './strategy/github.strategy'
import { JwtRefreshStrategy } from './strategy/jwt-refresh.strategy'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
	imports: [
		BucketModule,
		UserModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_ACCESS_TOKEN_SECRET,
			signOptions: {
				expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
			},
		}),
	],
	providers: [
		GithubStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		AuthService,
		// AuthResolver,
	],
	controllers: [AuthController],
	exports: [JwtModule],
})
export class AuthModule {}
