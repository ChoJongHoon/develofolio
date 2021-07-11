import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { RequestWithAuth, Response } from 'express'
import { baseConfig } from 'src/config/base.config'
import { JwtAuthService } from '../jwt/jwt-auth.service'
import { GithubOauthGuard } from './github-oauth.guard'

@Controller('auth/github')
export class GithubOauthController {
	constructor(
		private readonly jwtAuthService: JwtAuthService,
		@Inject(baseConfig.KEY)
		private readonly baseConfigService: ConfigType<typeof baseConfig>
	) {}

	@Get()
	@UseGuards(GithubOauthGuard)
	async githubAuth() {
		// Guard redirects
	}

	@Get('redirect')
	@UseGuards(GithubOauthGuard)
	async githubAuthRedirect(@Req() req: RequestWithAuth, @Res() res: Response) {
		const { accessToken, refreshToken } = this.jwtAuthService.createToken(
			req.user.id
		)

		this.jwtAuthService.setAccessToken(res, accessToken)
		this.jwtAuthService.setRefreshToken(res, refreshToken)

		return res.redirect(this.baseConfigService.clientHost)
	}
}
