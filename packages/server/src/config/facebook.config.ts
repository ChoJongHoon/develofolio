import { registerAs } from '@nestjs/config'

export const facebookConfig = registerAs('facebook', () => ({
	clientId: process.env.FACEBOOK_CLIENT_ID,
	clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
}))
