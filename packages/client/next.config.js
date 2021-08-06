/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
const nextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
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
		domains: [
			process.env.NEXT_PUBLIC_IMAGES_HOST.replace(/(^\w+:|^)\/\//, ''),
			'avatars.githubusercontent.com',
		],
	},
	reactStrictMode: true,
}

module.exports = nextConfig
