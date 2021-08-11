import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { JwtAuthController } from './jwt-auth.controller'
import { JwtAuthService } from './jwt-auth.service'
import { JwtAuthStrategy } from './jwt-access.strategy'
import { JwtRefreshAuthStrategy } from './jwt-refresh.strategy'
import { UserModule } from '../../user/user.module'

@Module({
	imports: [JwtModule.register({}), UserModule],
	providers: [JwtAuthStrategy, JwtRefreshAuthStrategy, JwtAuthService],
	exports: [JwtModule, JwtAuthService],
	controllers: [JwtAuthController],
})
export class JwtAuthModule {}
