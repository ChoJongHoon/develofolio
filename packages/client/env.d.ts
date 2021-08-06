declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test'
		readonly NEXT_PUBLIC_SERVER_HOST: string
		readonly NEXT_PUBLIC_IMAGES_HOST: string
	}
}
