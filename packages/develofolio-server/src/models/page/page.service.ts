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
		return await this.pageRepository.find({
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
}
