import { registerEnumType } from '@nestjs/graphql'

export enum SocialLinkType {
	GITHUB = 'GITHUB',
	FACEBOOK = 'FACEBOOK',
	TWITTER = 'TWITTER',
	STACK_OVERFLOW = 'STACK_OVERFLOW',
}

registerEnumType(SocialLinkType, {
	name: 'SocialLinkType',
})
