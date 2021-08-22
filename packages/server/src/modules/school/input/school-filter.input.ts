import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SchoolFilterInput {
	@Field(() => String)
	keyword?: string
}
