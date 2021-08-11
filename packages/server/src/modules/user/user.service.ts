import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProviderType } from 'aws-sdk/clients/codegurureviewer'
import { Repository } from 'typeorm'
import { CreateUserInput } from './input/create-user.input'
import { UpdateUserInput } from './input/update-user.input'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	findOne(id: string) {
		return this.userRepository.findOne(id)
	}

	findOneOrFail(id: string) {
		return this.userRepository.findOneOrFail(id)
	}

	async findByProvider(provider: ProviderType, providerId: string) {
		return await this.userRepository.findOne({
			where: {
				provider,
				providerId,
			},
		})
	}

	async create(fields: CreateUserInput) {
		return await this.userRepository.save({ ...fields })
	}

	async update(id: string, fields: UpdateUserInput) {
		return await this.userRepository.update(id, { ...fields })
	}
}
