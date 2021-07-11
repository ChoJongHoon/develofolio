import { registerEnumType } from '@nestjs/graphql'

export enum ProviderType {
	GITHUB = 'GITHUB',
}

registerEnumType(ProviderType, {
	name: 'ProviderType',
})
