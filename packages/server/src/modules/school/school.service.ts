import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { cursorPaginate } from '../../common/pagination/cursor-paginate'
import { CursorPaginationArgs } from '../../common/pagination/pagination.args'
import { SchoolFilterInput } from './input/school-filter.input'
import { School } from './school.entity'

@Injectable()
export class SchoolService {
	constructor(
		@InjectRepository(School)
		private readonly schoolRepository: Repository<School>
	) {}

	async findByCursor(
		paginationArgs: CursorPaginationArgs,
		filter?: SchoolFilterInput
	) {
		const qb = this.schoolRepository.createQueryBuilder('school')

		if (filter?.keyword) {
			qb.where(`school.name ILIKE :keyword`, {
				keyword: `%${filter.keyword}%`,
			})
		}

		return await cursorPaginate(School, qb, paginationArgs, ['name', 'id'])
	}
}
