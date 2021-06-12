import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page } from './models/page.entity'

@Module({
	imports: [TypeOrmModule.forFeature([Page])],
	providers: [],
	controllers: [],
	exports: [],
})
export class PageModule {}
