import { registerEnumType } from '@nestjs/graphql'

export enum UploadType {
	PROFILE = 'PROFILE',
	PROJECT = 'PROJECT',
	EXPERIENCE = 'EXPERIENCE',
}

registerEnumType(UploadType, {
	name: 'UploadType',
})
