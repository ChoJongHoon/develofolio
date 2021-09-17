import { registerEnumType } from '@nestjs/graphql'

export enum ProviderType {
	GITHUB = 'GITHUB',
	FACEBOOK = 'FACEBOOK',
}

registerEnumType(ProviderType, {
	name: 'ProviderType',
})
