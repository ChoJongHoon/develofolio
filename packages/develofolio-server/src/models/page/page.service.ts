import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Page } from './models/page.entity'

@Injectable()
export class PageService {
	constructor(
		@InjectRepository(Page)
		private pageRepository: Repository<Page>
	) {}

	async findByUser(userId: string) {
		return await this.pageRepository.findOne({
			where: {
				userId,
			},
		})
	}

	async create(userId: string, slug: string, initialContent: any) {
		return await this.pageRepository.save({
			userId,
			slug,
			content: initialContent,
		})
	}

	async save(userId: string, content: any) {
		const page = await this.findByUser(userId)
		if (!page) {
			return null
		}
		page.content = content

		return await this.pageRepository.save(page)
	}
}
