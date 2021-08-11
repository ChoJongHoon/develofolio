import { InputType, PartialType, PickType } from '@nestjs/graphql'
import { User } from '../user.entity'

@InputType()
export class UpdateUserInput extends PartialType(
	PickType(User, ['avatar', 'email', 'name'] as const),
	InputType
) {}
