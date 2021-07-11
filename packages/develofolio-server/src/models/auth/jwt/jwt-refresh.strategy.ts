import { Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Request } from 'express'
import { jwtConfig } from 'src/config/jwt.config'

export type JwtRefreshPayload = { uid: string }

@Injectable()
export class JwtRefreshAuthStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh'
) {
	constructor(
		@Inject(jwtConfig.KEY) jwtConfigService: ConfigType<typeof jwtConfig>
	) {
		const extractJwtFromCookie = (req: Request) => {
			let token = null
			if (req && req.cookies) {
				token = req.cookies['refresh_token']
			}
			return token
		}

		super({
			jwtFromRequest: extractJwtFromCookie,
			ignoreExpiration: false,
			secretOrKey: jwtConfigService.refreshTokenSecret,
		})
	}

	extractJwtFromCookie(req: Request) {
		let token = null
		if (req && req.cookies) {
			token = req.cookies['refresh_token']
		}
		return token
	}

	async validate(payload: JwtRefreshPayload) {
		return { id: payload.uid }
	}
}
