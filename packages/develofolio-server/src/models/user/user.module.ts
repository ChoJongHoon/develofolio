import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService, UserResolver],
	controllers: [],
	exports: [TypeOrmModule.forFeature([User]), UserService],
})
export class UserModule {}
