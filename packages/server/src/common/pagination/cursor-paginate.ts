import { CursorPaginationArgs } from './pagination.args'
import {
	Brackets,
	ObjectType,
	OrderByCondition,
	SelectQueryBuilder,
	WhereExpression,
} from 'typeorm'
import { CursorPageInfo } from './page-info'

interface CursorParam {
	[key: string]: any
}

export async function cursorPaginate<T extends { [key in string]: any }>(
	entity: ObjectType<T>,
	qb: SelectQueryBuilder<T>,
	paginationArgs: CursorPaginationArgs,
	cursorColumns: Extract<keyof T, string>[],
	defaultLimit = 100
) {
	const getEntityPropertyType = (key: string): string => {
		return Reflect.getMetadata(
			'design:type',
			entity.prototype,
			key
		).name.toLowerCase()
	}

	const encode = (row: Record<string, any>) => {
		const payload = cursorColumns
			.map((key) => {
				const type = getEntityPropertyType(key)
				const value = encodeByType(type, row[key])
				return `${key}:${value}`
			})
			.join(',')

		return Buffer.from(payload).toString('base64')
	}

	const decode = (cursor: string): CursorParam => {
		const cursors: CursorParam = {}
		const columns = Buffer.from(cursor, 'base64').toString().split(',')
		columns.forEach((column) => {
			const [key, raw] = column.split(':')
			const type = getEntityPropertyType(key)
			const value = decodeByType(type, raw)
			cursors[key] = value
		})

		return cursors
	}

	const countQuery = qb.clone()
	const countTotal = await countQuery.getCount()
	const limit =
		paginationArgs.first != null
			? paginationArgs.first
			: paginationArgs.last != null
			? paginationArgs.last
			: defaultLimit
	const order = paginationArgs.first ? 'ASC' : 'DESC'

	const buildCursorQuery = (
		where: WhereExpression,
		cursors: CursorParam,
		flipOrder = false
	): void => {
		let operator: '>' | '<' = order === 'ASC' ? '>' : '<'
		if (flipOrder) {
			operator = operator === '>' ? '<' : '>'
		}
		const params: CursorParam = {}
		let query = ''
		cursorColumns.forEach((key) => {
			params[key] = cursors[key]
			where.orWhere(`${query}${qb.alias}.${key} ${operator} :${key}`, params)
			query = `${query}${qb.alias}.${key} = :${key} AND `
		})
	}

	const buildOrder = (): OrderByCondition => {
		const orderByCondition: OrderByCondition = {}
		cursorColumns.forEach((key) => {
			orderByCondition[`${qb.alias}.${key}`] = order
		})

		return orderByCondition
	}

	const cursors: CursorParam = {}

	if (paginationArgs.after) {
		Object.assign(cursors, decode(paginationArgs.after))
	} else if (paginationArgs.before) {
		Object.assign(cursors, decode(paginationArgs.before))
	}

	if (Object.keys(cursors).length > 0) {
		qb.andWhere(new Brackets((where) => buildCursorQuery(where, cursors)))
	}

	qb.orderBy(buildOrder())

	const result = await qb.take(limit).getMany()
	const edges = result.map((value) => {
		return {
			node: value,
			cursor: encode(value),
		}
	})

	const startCursor = result.length > 0 ? encode(result[0]) : null
	const endCursor = result.length > 0 ? encode(result[result.length - 1]) : null

	const countBefore = startCursor
		? await countQuery
				.clone()
				.andWhere(
					new Brackets((where) =>
						buildCursorQuery(where, decode(startCursor), true)
					)
				)
				.getCount()
		: 0

	const countAfter = endCursor
		? await countQuery
				.clone()
				.andWhere(
					new Brackets((where) => buildCursorQuery(where, decode(endCursor)))
				)
				.getCount()
		: 0

	const pageInfo = new CursorPageInfo()
	pageInfo.startCursor = edges.length > 0 ? edges[0].cursor : ''
	pageInfo.endCursor = edges.length > 0 ? edges.slice(-1)[0].cursor : ''
	pageInfo.hasNextPage = countAfter > 0
	pageInfo.hasPreviousPage = countBefore > 0
	pageInfo.countBefore = countBefore
	pageInfo.countCurrent = edges.length
	pageInfo.countNext = countAfter
	pageInfo.countTotal = countTotal

	return { edges, pageInfo }
}

const encodeByType = (type: string, value: any): string | null => {
	if (value === null) return null

	switch (type) {
		case 'date': {
			return (value as Date).getTime().toString()
		}
		case 'number': {
			return `${value}`
		}
		case 'string': {
			return encodeURIComponent(value)
		}
		case 'object': {
			/**
			 * if reflection type is Object, check whether an object is a date.
			 * see: https://github.com/rbuckton/reflect-metadata/issues/84
			 */
			if (typeof value.getTime === 'function') {
				return (value as Date).getTime().toString()
			}

			break
		}
		default:
			break
	}

	throw new Error(`unknown type in cursor: [${type}]${value}`)
}

const decodeByType = (type: string, value: string): string | number | Date => {
	switch (type) {
		case 'object':
		case 'date': {
			const timestamp = parseInt(value, 10)

			if (Number.isNaN(timestamp)) {
				throw new Error('date column in cursor should be a valid timestamp')
			}

			return new Date(timestamp)
		}

		case 'number': {
			const num = parseInt(value, 10)

			if (Number.isNaN(num)) {
				throw new Error('number column in cursor should be a valid number')
			}

			return num
		}

		case 'string': {
			return decodeURIComponent(value)
		}

		default: {
			throw new Error(`unknown type in cursor: [${type}]${value}`)
		}
	}
}
