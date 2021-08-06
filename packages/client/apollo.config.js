// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = {
	client: {
		service: {
			name: 'develofolio',
			url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/graphql`,
		},
		excludes: ['**/*.generated.*'],
	},
}
