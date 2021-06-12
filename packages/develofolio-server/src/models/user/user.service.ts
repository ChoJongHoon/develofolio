import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
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

	async findOrCreate(input: CreateUserInput) {
		let user = await this.userRepository.findOne({
			where: {
				providerId: input.providerId,
				providerAccountId: input.providerAccountId,
			},
		})

		if (!user) {
			user = await this.userRepository.save({ ...input })
		}

		return user
	}
}
