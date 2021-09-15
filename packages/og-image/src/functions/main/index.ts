import { AWS } from '@serverless/typescript'
import { handlerPath } from '~/libs/handler-path'

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	events: [
		{
			http: {
				method: 'GET',
				path: '/',
			},
		},
	],
	timeout: 60,
} as AWS['functions'][string]
