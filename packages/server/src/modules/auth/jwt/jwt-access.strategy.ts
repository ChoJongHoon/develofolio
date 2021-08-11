import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Request } from 'express'
import { jwtConfig } from '../../../config/jwt.config'
import { User } from '../../user/user.entity'
import { UserService } from '../../user/user.service'

export type JwtPayload = { uid: string }

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-access') {
	constructor(
		@Inject(jwtConfig.KEY) jwtEnv: ConfigType<typeof jwtConfig>,
		private readonly userService: UserService
	) {
		super({
			jwtFromRequest: (req: Request) => {
				let token = null
				if (req && req.cookies) {
					token = req.cookies['access_token']
				}
				return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req)
			},
			ignoreExpiration: false,
			secretOrKey: jwtEnv.accessTokenSecret,
		})
	}

	extractJwtFromCookie(req: Request) {
		let token = null
		if (req && req.cookies) {
			token = req.cookies['access_token']
		}
		return token
	}

	async validate(payload: JwtPayload): Promise<User> {
		return await this.userService.findOneOrFail(payload.uid)
	}
}
