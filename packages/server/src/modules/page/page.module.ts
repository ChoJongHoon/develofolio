import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'
import { Page } from './page.entity'
import { PageResolver } from './page.resolver'
import { PageService } from './page.service'

@Module({
	imports: [TypeOrmModule.forFeature([Page]), forwardRef(() => UserModule)],
	providers: [PageResolver, PageService],
	exports: [PageService],
})
export class PageModule {}
