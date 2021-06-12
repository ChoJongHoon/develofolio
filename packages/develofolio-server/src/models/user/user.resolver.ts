import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard'
import { CurrentUser } from './decorator/current-user.decorator'
import { CreateUserInput } from './dto/create-user.input'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => User)
	@UseGuards(GqlAuthGuard)
	async me(@CurrentUser() user: User) {
		return user
	}

	@Query(() => User)
	async findOrCreateUser(
		@Args('input', { type: () => CreateUserInput }) input: CreateUserInput
	) {
		return await this.userService.findOrCreate(input)
	}
}
