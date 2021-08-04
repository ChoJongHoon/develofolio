import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Response } from 'express'
import { jwtConfig } from '../../../config/jwt.config'
import { JwtPayload } from './jwt-access.strategy'
import { JwtRefreshPayload } from './jwt-refresh.strategy'

@Injectable()
export class JwtAuthService {
	constructor(
		private readonly jwtService: JwtService,
		@Inject(jwtConfig.KEY)
		private readonly jwtConfigService: ConfigType<typeof jwtConfig>
	) {}

	verifyRefreshToken(refreshToken: string) {
		return this.jwtService.verify<JwtRefreshPayload>(refreshToken, {
			secret: this.jwtConfigService.refreshTokenSecret,
		})
	}

	createToken(id: string) {
		const payload: JwtPayload = { uid: id }
		return {
			accessToken: this.jwtService.sign(payload, {
				secret: this.jwtConfigService.accessTokenSecret,
				expiresIn: this.jwtConfigService.accessTokenExpiresIn,
			}),
			refreshToken: this.jwtService.sign(payload, {
				secret: this.jwtConfigService.refreshTokenSecret,
				expiresIn: this.jwtConfigService.refreshTokenExpiresIn,
			}),
		}
	}

	setAccessToken(res: Response, accessToken: string) {
		res.cookie('access_token', accessToken, {
			httpOnly: true,
			domain:
				process.env.NODE_ENV === 'production'
					? '.develofolio.com'
					: 'localhost',
		})
	}

	setRefreshToken(res: Response, refreshToken: string) {
		res.cookie('refresh_token', refreshToken, {
			httpOnly: true,
			path: '/jwt/refresh',
			domain:
				process.env.NODE_ENV === 'production'
					? '.develofolio.com'
					: 'localhost',
		})
	}

	removeToken(res: Response) {
		res.cookie('access_token', '', {
			httpOnly: true,
			maxAge: 0,
			domain:
				process.env.NODE_ENV === 'production'
					? '.develofolio.com'
					: 'localhost',
		})
		res.cookie('refresh_token', '', {
			httpOnly: true,
			path: '/jwt/refresh',
			maxAge: 0,
			domain:
				process.env.NODE_ENV === 'production'
					? '.develofolio.com'
					: 'localhost',
		})
	}
}
