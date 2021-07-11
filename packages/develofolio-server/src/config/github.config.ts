import { registerAs } from '@nestjs/config'

export const githubConfig = registerAs('github', () => ({
	clientId: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
}))
