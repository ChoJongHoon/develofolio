import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getConnection, Repository } from 'typeorm'
import { UserService } from '../user/user.service'
import { CreatePageDto } from './dto/create-page.dto'
import { Page } from './page.entity'

@Injectable()
export class PageService {
	constructor(
		@InjectRepository(Page)
		private readonly pageRepository: Repository<Page>,
		private readonly userService: UserService
	) {}

	async findByUserId(userId: string) {
		return await this.pageRepository.findOne({
			where: { userId },
		})
	}

	async create(input: CreatePageDto) {
		const connection = getConnection()
		const queryRunner = connection.createQueryRunner()

		await queryRunner.startTransaction()

		const page = await this.pageRepository.save({
			...input,
		})

		await this.userService.bindPage(input.userId, page.id)

		await queryRunner.commitTransaction()

		return page
	}

	async updateByUserId(userId: string, fields: Omit<Partial<Page>, 'id'>) {
		const page = await this.findByUserId(userId)

		if (!page) {
			return null
		}

		return await this.pageRepository.save({
			...page,
			...fields,
		})
	}
}
