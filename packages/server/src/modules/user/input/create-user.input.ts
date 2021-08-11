import { InputType, PickType } from '@nestjs/graphql'
import { User } from '../user.entity'

@InputType()
export class CreateUserInput extends PickType(
	User,
	['avatar', 'email', 'name', 'providerId', 'provider', 'pageId'] as const,
	InputType
) {}
