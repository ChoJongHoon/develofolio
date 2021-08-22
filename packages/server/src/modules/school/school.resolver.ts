import { Args, Query, Resolver } from '@nestjs/graphql'
import { CursorPaginationArgs } from '../../common/pagination/pagination.args'
import { CursorPaginatedSchool } from './dto/cursor-paginated-school.dto'
import { SchoolFilterInput } from './input/school-filter.input'
import { School } from './school.entity'
import { SchoolService } from './school.service'

@Resolver(() => School)
export class SchoolResolver {
	constructor(private readonly schoolService: SchoolService) {}

	@Query(() => CursorPaginatedSchool)
	async getSchoolsByCursor(
		@Args() paginationArgs: CursorPaginationArgs,
		@Args('filter', { nullable: true }) filter?: SchoolFilterInput
	) {
		return await this.schoolService.findByCursor(paginationArgs, filter)
	}
}
