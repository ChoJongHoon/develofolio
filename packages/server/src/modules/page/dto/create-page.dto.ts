import { Page } from '../page.entity'

export class CreatePageDto implements Partial<Page> {
	userId: string
	slug: string
	content: any
}
