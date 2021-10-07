const withTM = require('next-transpile-modules')(['gsap'])

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
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
						ref: true,
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
	rewrites: async () => {
		return [
			{
				has: [
					{
						type: 'host',
						value: '(^|s)localhost',
					},
				],
				source: '/',
				destination: '/actual-index',
			},
			{
				has: [
					{
						type: 'host',
						value: '(^|s)develofolio.com',
					},
				],
				source: '/',
				destination: '/actual-index',
			},
			{
				has: [
					{
						type: 'host',
						value: '(?<slug>.+).localhost',
					},
				],
				source: '/',
				destination: '/:slug',
			},
			{
				has: [
					{
						type: 'host',
						value: '(?<slug>.+).develofolio.com',
					},
				],
				source: '/',
				destination: '/:slug',
			},
		]
	},
}

module.exports = withTM(nextConfig)
