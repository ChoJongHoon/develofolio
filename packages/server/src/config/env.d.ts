/// <reference types="node" />

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test'

		readonly CLIENT_HOST: string
		readonly HOST: string

		readonly DB_HOST: string
		readonly DB_USER: string
		readonly DB_PORT: string
		readonly DB_USERNAME: string
		readonly DB_PASSWORD: string

		readonly GITHUB_CLIENT_ID: string
		readonly GITHUB_CLIENT_SECRET: string

		readonly JWT_ACCESS_TOKEN_SECRET: string
		readonly JWT_ACCESS_TOKEN_EXPIRES_IN: string
		readonly JWT_REFRESH_TOKEN_SECRET: string
		readonly JWT_REFRESH_TOKEN_EXPIRES_IN: string

		readonly AWS_ACCESS_KEY_ID: string
		readonly AWS_SECRET_ACCESS_KEY: string
		readonly AWS_PUBLIC_BUCKET_NAME: string
	}
}
