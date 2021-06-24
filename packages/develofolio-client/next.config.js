module.exports = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			issuer: {
				test: /\.(js|ts)x?$/,
			},
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						removeViewBox: false,
					},
				},
			],
		})

		return config
	},
	images: {
		domains: [process.env.NEXT_PUBLIC_RESOURCE_DOMAIN],
	},
	reactStrictMode: true,
}
