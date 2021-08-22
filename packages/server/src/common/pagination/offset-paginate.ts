import { SelectQueryBuilder } from 'typeorm'
import { OffsetPageInfo } from './page-info'
import { OffsetPaginationArgs } from './pagination.args'

export async function offsetPaginate<T>(
	query: SelectQueryBuilder<T>,
	paginationArgs: OffsetPaginationArgs
) {
	const { limit, offset } = paginationArgs
	const countTotal = await query.getCount()
	const countAfter = countTotal - (offset + limit)

	query.limit(limit).offset(offset)

	const result = await query.getMany()
	const edges = result.map((value) => ({
		node: value,
	}))

	const pageInfo = new OffsetPageInfo()
	pageInfo.hasNextPage = countAfter > 0
	pageInfo.hasPreviousPage = offset > 0
	pageInfo.countCurrent = edges.length
	pageInfo.countBefore = offset
	pageInfo.countNext = countAfter > 0 ? countAfter : 0
	pageInfo.countTotal = countTotal

	return { edges, pageInfo }
}
