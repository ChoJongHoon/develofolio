import { InputType, PickType, PartialType } from '@nestjs/graphql'
import { Page } from '../page.entity'

@InputType()
export class UpdatePageInput extends PartialType(
	PickType(Page, ['content', 'slug', 'title', 'gtag', 'language'] as const),
	InputType
) {}
