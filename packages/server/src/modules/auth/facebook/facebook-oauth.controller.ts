import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { RequestWithAuth, Response } from 'express'
import { baseConfig } from '../../../config/base.config'
import { JwtAuthService } from '../jwt/jwt-auth.service'
import { FacebookOauthGuard } from './facebook-oauth.guard'

@Controller('auth/facebook')
export class FacebookOauthController {
	constructor(
		private readonly jwtAuthService: JwtAuthService,
		@Inject(baseConfig.KEY)
		private readonly baseConfigService: ConfigType<typeof baseConfig>
	) {}

	@Get()
	@UseGuards(FacebookOauthGuard)
	async facebookAuth() {
		// Guard redirects
	}

	@Get('redirect')
	@UseGuards(FacebookOauthGuard)
	async facebookAuthRedirect(
		@Req() req: RequestWithAuth,
		@Res() res: Response
	) {
		const { accessToken, refreshToken } = this.jwtAuthService.createToken(
			req.user.id
		)

		this.jwtAuthService.setAccessToken(res, accessToken)
		this.jwtAuthService.setRefreshToken(res, refreshToken)

		return res.redirect(this.baseConfigService.clientHost)
	}
}
