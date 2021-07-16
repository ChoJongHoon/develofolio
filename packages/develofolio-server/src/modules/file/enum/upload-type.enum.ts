import { registerEnumType } from '@nestjs/graphql'

export enum UploadType {
	PROFILE = 'PROFILE',
}

registerEnumType(UploadType, {
	name: 'UploadType',
})
