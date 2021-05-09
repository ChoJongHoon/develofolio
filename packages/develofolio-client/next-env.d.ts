/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
	const content: any
	export default content
}

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test'
		readonly NEXT_PUBLIC_GITHUB_CLIENT_ID: string
		readonly NEXT_PUBLIC_GRAPHQL_HOST: string
	}
}
