import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
	AccessTokenPayload,
	RefreshTokenPayload,
} from './interface/token.interface'

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}

	public getCookieWithJwtAccessToken(uid: string) {
		const payload: AccessTokenPayload = { uid }
		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_ACCESS_TOKEN_SECRET,
			expiresIn: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME),
		})

		return {
			accessToken: token,
			domain: 'localhost',
			path: '/',
			httpOnly: true,
			maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
		}
	}

	public getCookieWithJwtRefreshToken(uid: string) {
		const payload: RefreshTokenPayload = { uid }
		const token = this.jwtService.sign(payload, {
			secret: process.env.JWT_REFRESH_TOKEN_SECRET,
			expiresIn: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
		})

		return {
			refreshToken: token,
			domain: 'localhost',
			path: '/',
			httpOnly: true,
			maxAge: Number(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) * 1000,
		}
	}

	getCookiesForLogOut() {
		return {
			accessOption: {
				domain: 'localhost',
				path: '/',
				httpOnly: true,
				maxAge: 0,
			},
			refreshOption: {
				domain: 'localhost',
				path: '/',
				httpOnly: true,
				maxAge: 0,
			},
		}
	}
}
