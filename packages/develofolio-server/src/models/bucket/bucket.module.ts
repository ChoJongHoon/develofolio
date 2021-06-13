import { HttpModule, Module } from '@nestjs/common'
import { BucketResolver } from './bucket.resolver'
import { BucketService } from './bucket.service'

@Module({
	imports: [HttpModule],
	providers: [BucketService, BucketResolver],
	exports: [BucketService],
})
export class BucketModule {}
