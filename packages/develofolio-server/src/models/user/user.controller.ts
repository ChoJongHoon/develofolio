import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UesrController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async findAll() {
		return await this.userService.findAll()
	}
}
