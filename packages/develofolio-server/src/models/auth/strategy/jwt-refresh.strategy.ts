import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { RefreshTokenPayload } from '../interface/token.interface'
import { Request } from 'express'
import { UserService } from 'src/models/user/user.service'

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token'
) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => request?.cookies?.refreshToken,
			]),
			secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
			passReqToCallback: true,
		})
	}

	async validate(
		req: Request,
		payload: RefreshTokenPayload,
		done: VerifiedCallback
	) {
		try {
			const user = await this.userService.findOne(payload.uid)

			req.user = user

			return done(null, user)
		} catch (error) {
			return done(error)
		}
	}
}
