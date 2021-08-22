import { registerEnumType } from '@nestjs/graphql'

export enum UploadType {
	PROFILE = 'PROFILE',
	PROJECT = 'PROJECT',
	SCHOOL = 'SCHOOL',
	CAREER = 'CAREER',
}

registerEnumType(UploadType, {
	name: 'UploadType',
})
