import { Args, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from './dto/create-user.input'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => User)
	async findUser(@Args('id', { type: () => String }) id: string) {
		return await this.userService.findOne(id)
	}

	@Query(() => User)
	async findOrCreateUser(
		@Args('input', { type: () => CreateUserInput }) input: CreateUserInput
	) {
		return await this.userService.findOrCreate(input)
	}
}
