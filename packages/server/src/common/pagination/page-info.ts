import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class OffsetPageInfo {
	@Field(() => Boolean)
	hasPreviousPage: boolean

	@Field(() => Boolean)
	hasNextPage: boolean

	@Field(() => Int)
	countCurrent: number

	@Field(() => Int)
	countTotal: number

	@Field(() => Int)
	countBefore: number

	@Field(() => Int)
	countNext: number
}

@ObjectType()
export class CursorPageInfo extends OffsetPageInfo {
	@Field(() => String)
	startCursor: string

	@Field(() => String)
	endCursor: string
}
