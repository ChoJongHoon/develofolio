import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { File } from './file.entity'
import { FileResolver } from './file.resolver'
import { FileService } from './file.service'

@Module({
	imports: [TypeOrmModule.forFeature([File])],
	providers: [FileService, FileResolver],
	exports: [FileService],
})
export class FileModule {}
