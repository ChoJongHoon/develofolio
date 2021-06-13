import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'
import { User } from '../user/user.entity'
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

	async updateByUserId(userId: string, fields: DeepPartial<Page>) {
		const page = await this.findByUser(userId)

		if (!page) {
			return null
		}
		return await this.pageRepository.save({ id: page.id, ...fields })
	}
}
