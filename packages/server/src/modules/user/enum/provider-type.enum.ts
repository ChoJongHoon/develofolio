import { registerEnumType } from '@nestjs/graphql'

export enum ProviderType {
	GITHUB = 'GITHUB',
	FACEBOOK = 'FACEBOOK',
	GOOGLE = 'GOOGLE',
}

registerEnumType(ProviderType, {
	name: 'ProviderType',
})
