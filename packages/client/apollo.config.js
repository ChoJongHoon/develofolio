module.exports = {
	client: {
		service: {
			name: 'develofolio',
			localSchemaFile: './packages/server/schema.graphql',
		},
		excludes: ['**/*.generated.*'],
	},
}
