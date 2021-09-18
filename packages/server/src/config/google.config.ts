import { registerAs } from '@nestjs/config'

export const googleConfig = registerAs('google', () => ({
	clientId: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}))
