import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, Repository } from 'typeorm'
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

	async findOneBySlug(slug: string) {
		return await this.pageRepository.findOneOrFail({
			where: {
				slug,
			},
		})
	}

	async getPaths() {
		return (
			await this.pageRepository.find({
				select: ['slug'],
				where: {
					slug: Not(IsNull),
				},
			})
		).map((page) => page.slug as string)
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

	async isDuplicatedSlug(slug: string) {
		const count = await this.pageRepository.count({
			where: {
				slug,
			},
		})

		return count > 0
	}
}
