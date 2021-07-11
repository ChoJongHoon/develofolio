import { registerAs } from '@nestjs/config'

export const jwtConfig = registerAs('jwt', () => ({
	accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
	accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
	refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
	refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
}))
