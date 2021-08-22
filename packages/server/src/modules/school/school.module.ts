import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { School } from './school.entity'
import { SchoolResolver } from './school.resolver'
import { SchoolService } from './school.service'

@Module({
	imports: [TypeOrmModule.forFeature([School])],
	providers: [SchoolResolver, SchoolService],
})
export class SchoolModule {}
