declare namespace NodeJS {
	interface ProcessEnv {
		readonly SERVER: string
		readonly CLIENT: string

		readonly DB_HOST: string
		readonly DB_PORT: string
		readonly DB_NAME: string
		readonly DB_USERNAME: string
		readonly DB_PASSWORD: string

		readonly GITHUB_CLIENT_ID: string
		readonly GITHUB_CLIENT_SECRET: string

		readonly JWT_ACCESS_TOKEN_SECRET: string
		readonly JWT_ACCESS_TOKEN_EXPIRATION_TIME: string
		readonly JWT_REFRESH_TOKEN_SECRET: string
		readonly JWT_REFRESH_TOKEN_EXPIRATION_TIME: string

		readonly AWS_ACCESS_KEY_ID: string
		readonly AWS_SECRET_ACCESS_KEY: string
		readonly AWS_S3_BUCKET: string
	}
}
