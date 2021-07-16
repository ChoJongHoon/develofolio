import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UploadUrl {
	@Field(() => String)
	url: string

	@Field(() => String)
	key: string
}
