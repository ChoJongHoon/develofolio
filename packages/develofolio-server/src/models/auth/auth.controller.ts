import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Redirect,
	Req,
	Res,
	UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { JwtRefreshGuard } from './guard/jwt-refresh.guard'

@Controller('auth')
export default class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('/github')
	@UseGuards(AuthGuard('github'))
	public async githubLogin() {
		return HttpStatus.OK
	}

	@Get('/github/redirect')
	@UseGuards(AuthGuard('github'))
	@Redirect()
	public async githubLoginRedirect(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response
	) {
		const user = req.user

		if (!user) {
			throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
		}

		const {
			accessToken,
			...accessOption
		} = this.authService.getCookieWithJwtAccessToken(user.id)

		res.cookie('accessToken', accessToken, accessOption)

		const {
			refreshToken,
			...refreshOption
		} = this.authService.getCookieWithJwtRefreshToken(user.id)

		res.cookie('refreshToken', refreshToken, refreshOption)

		return {
			url: `${process.env.CLIENT}/login/success/${accessToken}`,
		}
	}

	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		const user = req.user

		if (!user) {
			throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
		}

		const {
			accessToken,
			...accessOption
		} = this.authService.getCookieWithJwtAccessToken(user.id)

		res.cookie('accessToken', accessToken, accessOption)

		const {
			refreshToken,
			...refreshOption
		} = this.authService.getCookieWithJwtRefreshToken(user.id)

		res.cookie('refreshToken', refreshToken, refreshOption)

		return {
			accessToken,
		}
	}
}
