import { ArgsType, Int, Field } from '@nestjs/graphql'

@ArgsType()
export class CursorPaginationArgs {
	@Field(() => Int, { nullable: true })
	first?: number

	@Field(() => String, { nullable: true })
	after?: string

	@Field(() => Int, { nullable: true })
	last?: number

	@Field(() => String, { nullable: true })
	before?: string
}

@ArgsType()
export class OffsetPaginationArgs {
	@Field(() => Int)
	limit: number

	@Field(() => Int)
	offset: number
}
