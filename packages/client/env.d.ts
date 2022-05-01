declare namespace NodeJS {
	interface ProcessEnv {
		readonly NEXT_PUBLIC_CLIENT_HOST: string
		readonly NEXT_PUBLIC_SERVER_HOST: string
		readonly NEXT_PUBLIC_IMAGES_HOST: string
		readonly NEXT_PUBLIC_IMAGES_V2_HOST: string
		readonly NEXT_PUBLIC_OG_IMAGE_HOST: string
		readonly NEXT_PUBLIC_GA_TRACKING_ID?: string
	}
}
