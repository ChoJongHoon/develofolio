import { registerEnumType } from '@nestjs/graphql'

export enum UploadType {
	PROFILE = 'PROFILE',
	PROJECT = 'PROJECT',
}

registerEnumType(UploadType, {
	name: 'UploadType',
})
