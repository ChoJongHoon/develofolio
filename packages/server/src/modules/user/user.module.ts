import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageModule } from '../page/page.module'
import { User } from './user.entity'
import { UserResolver } from './user.resolver'
import { UserService } from './user.service'

@Module({
	imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PageModule)],
	providers: [UserService, UserResolver],
	controllers: [],
	exports: [UserService],
})
export class UserModule {}
