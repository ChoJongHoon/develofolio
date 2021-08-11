import { InputType, PickType } from '@nestjs/graphql'
import { Page } from '../page.entity'

@InputType()
export class UpdatePageInput extends PickType(
	Page,
	['content'] as const,
	InputType
) {}
