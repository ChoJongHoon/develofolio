import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Page } from './models/page.entity'
import { PageResolver } from './page.resolver'
import { PageService } from './page.service'

@Module({
	imports: [TypeOrmModule.forFeature([Page])],
	providers: [PageResolver, PageService],
	exports: [],
})
export class PageModule {}
