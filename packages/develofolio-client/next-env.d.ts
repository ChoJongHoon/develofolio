/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
	import * as React from 'react'
	const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
	export default ReactComponent
}

declare namespace NodeJS {
	interface ProcessEnv {
		readonly NODE_ENV: 'development' | 'production' | 'test'
		readonly NEXT_PUBLIC_GITHUB_CLIENT_ID: string
		readonly NEXT_PUBLIC_GRAPHQL_HOST: string
	}
}
