import { Type } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { OffsetPageInfo, CursorPageInfo } from './page-info'

type PaginationType = 'cursor' | 'offset'

export function Paginated<T>(
	classRef: Type<T>,
	paginationType: PaginationType
): any {
	@ObjectType(`${classRef.name}OffsetEdge`, { isAbstract: true })
	abstract class OffsetEdgeType {
		@Field(() => classRef)
		node: T
	}

	@ObjectType(`${classRef.name}CursorEdge`, { isAbstract: true })
	abstract class CursorEdgeType extends OffsetEdgeType {
		@Field(() => String)
		cursor: string
	}

	const EdgeType = paginationType === 'offset' ? OffsetEdgeType : CursorEdgeType
	const PageInfo = paginationType === 'offset' ? OffsetPageInfo : CursorPageInfo

	@ObjectType({ isAbstract: true })
	abstract class PaginatedType {
		@Field(() => [EdgeType], { nullable: true })
		edges: OffsetEdgeType[] | CursorEdgeType[]

		@Field(() => PageInfo, { nullable: true })
		pageInfo: OffsetPageInfo | CursorPageInfo
	}

	return PaginatedType
}
