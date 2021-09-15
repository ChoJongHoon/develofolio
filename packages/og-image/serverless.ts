import { AWS } from '@serverless/typescript'
import main from '~/functions/main'

const serverlessConfiguration: AWS = {
	service: 'develofolio-og-image',
	frameworkVersion: '2',
	useDotenv: true,
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		region: 'us-east-1',
		lambdaHashingVersion: '20201221',
	},
	plugins: [
		'serverless-webpack',
		'serverless-offline',
		'serverless-apigw-binary',
	],
	custom: {
		webpack: {
			webpackConfig: './webpack.config.js',
			includeModules: true,
		},
		apigwBinary: {
			types: ['*/*'],
		},
	},
	functions: {
		main,
	},
}

module.exports = serverlessConfiguration
