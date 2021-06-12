import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as ormconifg from './ormconfig'

@Module({
	imports: [TypeOrmModule.forRoot(ormconifg)],
	controllers: [],
	providers: [],
})
export class AppModule {}
