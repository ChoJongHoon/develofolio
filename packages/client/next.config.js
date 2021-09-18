/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
	webpack: (config) => {
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
			'scontent-gmp1-1.xx.fbcdn.net',
			'lh3.googleusercontent.com',
		],
	},
	reactStrictMode: true,
	experimental: {
		nftTracing: true,
	},
}

module.exports = nextConfig
