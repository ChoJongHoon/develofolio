import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdatePageInput } from './input/update-page.input'
import { Page } from './page.entity'

@Injectable()
export class PageService {
	constructor(
		@InjectRepository(Page)
		private readonly pageRepository: Repository<Page>
	) {}

	async findOne(id: string) {
		return await this.pageRepository.findOneOrFail(id)
	}

	async create() {
		return await this.pageRepository.save(this.pageRepository.create())
	}

	async update(id: string, fields: UpdatePageInput) {
		return await this.pageRepository.save({
			id,
			...fields,
		})
	}
}
