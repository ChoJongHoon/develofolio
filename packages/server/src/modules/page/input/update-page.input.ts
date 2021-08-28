import { InputType, PickType } from '@nestjs/graphql'
import { Page } from '../page.entity'

@InputType()
export class UpdatePageInput extends PickType(
	Page,
	['content', 'slug', 'title', 'gtag'] as const,
	InputType
) {}
