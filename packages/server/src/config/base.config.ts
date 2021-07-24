import { registerAs } from '@nestjs/config'

export const baseConfig = registerAs('base', () => ({
	clientHost: process.env.CLIENT_HOST,
	host: process.env.HOST,
}))
