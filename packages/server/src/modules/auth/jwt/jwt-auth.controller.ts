import { Req, Controller, Get, Res, Query, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Request, Response } from 'express'
import { baseConfig } from '../../../config/base.config'
import { JwtAuthService } from './jwt-auth.service'

@Controller('jwt')
export class JwtAuthController {
	constructor(
		private readonly jwtEnv: JwtAuthService,
		@Inject(baseConfig.KEY)
		private readonly baseEnv: ConfigType<typeof baseConfig>
	) {}

	@Get('refresh')
	refresh(
		@Req() req: Request,
		@Res() res: Response,
		@Query('redirect') redirect?: string
	) {
		const oldRefreshToken = req.cookies['refresh_token']

		try {
			const { uid } = this.jwtEnv.verifyRefreshToken(oldRefreshToken)

			const { accessToken, refreshToken } = this.jwtEnv.createToken(uid)

			this.jwtEnv.setAccessToken(res, accessToken)
			this.jwtEnv.setRefreshToken(res, refreshToken)

			if (redirect) {
				return res.redirect(`${this.baseEnv.clientHost}${redirect}`)
			}

			return res.json({ accessToken })
		} catch (error) {
			this.jwtEnv.removeToken(res)

			if (redirect) {
				return res.redirect(`${this.baseEnv.clientHost}/auth/login`)
			}

			return res.json({ accessToken: null })
		}
	}

	@Get('logout')
	logout(@Res() res: Response) {
		this.jwtEnv.removeToken(res)
		return res.json({ ok: true })
	}
}
