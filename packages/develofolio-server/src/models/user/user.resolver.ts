import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/graphql/gql-auth.guard'
import { CurrentUser } from './decorator/current-user.decorator'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: User) {
		return await this.userService.findOne(user.id)
	}
}
