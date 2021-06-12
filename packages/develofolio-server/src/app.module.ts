import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './models/user/user.module'
import * as ormconifg from './ormconfig'

@Module({
	imports: [TypeOrmModule.forRoot(ormconifg), UserModule],
	controllers: [],
	providers: [],
})
export class AppModule {}
