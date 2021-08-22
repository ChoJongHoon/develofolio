import { registerEnumType } from '@nestjs/graphql'

export enum UploadType {
	PROFILE = 'PROFILE',
	PROJECT = 'PROJECT',
	SCHOOL = 'SCHOOL',
}

registerEnumType(UploadType, {
	name: 'UploadType',
})
