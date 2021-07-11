import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProviderType } from 'aws-sdk/clients/codegurureviewer'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>
	) {}

	findOne(id: string): Promise<User | undefined> {
		return this.userRepository.findOne(id)
	}

	async findByProvider(provider: ProviderType, providerId: string) {
		return await this.userRepository.findOne({
			where: {
				provider,
				providerId,
			},
		})
	}

	async create(input: CreateUserDto) {
		return await this.userRepository.save({ ...input })
	}

	async findOrCreate(input: CreateUserDto) {
		let user = await this.userRepository.findOne({
			where: {
				provider: input.provider,
				providerId: input.providerId,
			},
		})

		if (!user) {
			user = await this.userRepository.save({ ...input })
		}

		return user
	}
}
