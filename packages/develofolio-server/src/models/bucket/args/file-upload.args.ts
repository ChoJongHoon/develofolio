import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class SignedUrlType {
	@Field()
	uploadPath: string

	@Field()
	filename: string
}
