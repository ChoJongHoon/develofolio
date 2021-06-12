import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AccessTokenPayload } from '../interface/token.interface'
import { UserService } from 'src/models/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
		})
	}

	async validate(payload: AccessTokenPayload, done: VerifiedCallback) {
		const user = await this.userService.findOne(payload.uid)

		if (!user) {
			return done(new HttpException('Invalid token', HttpStatus.UNAUTHORIZED))
		}

		return done(null, user)
	}
}
