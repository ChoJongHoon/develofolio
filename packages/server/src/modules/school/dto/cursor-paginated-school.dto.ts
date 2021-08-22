import { ObjectType } from '@nestjs/graphql'
import { Paginated } from '../../../common/pagination/paginated'
import { School } from '../school.entity'

@ObjectType()
export class CursorPaginatedSchool extends Paginated(School, 'cursor') {}
