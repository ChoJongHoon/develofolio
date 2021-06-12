import { HttpModule, Module } from '@nestjs/common'
import { BucketService } from './bucket.service'

@Module({
	imports: [HttpModule],
	providers: [BucketService],
	exports: [BucketService],
})
export class BucketModule {}
