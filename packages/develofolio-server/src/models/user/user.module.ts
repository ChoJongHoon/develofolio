import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UesrController } from './user.controller'
import { User } from './user.entity'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService],
	controllers: [UesrController],
})
export class UserModule {}
