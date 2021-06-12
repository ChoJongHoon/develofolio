import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './models/auth/auth.module'
import { BucketModule } from './models/bucket/bucket.module'
import { UserModule } from './models/user/user.module'
import * as ormconifg from './ormconfig'

@Module({
	imports: [
		TypeOrmModule.forRoot(ormconifg),
		GraphQLModule.forRoot({
			autoSchemaFile: true,
			context: ({ req, res }: { req: Request; res: Response }) => {
				return { req, res }
			},
			playground: {
				settings: {
					'request.credentials': 'include',
				},
			},
			cors: {
				origin: 'http://localhost:3000',
				credentials: true,
			},
		}),
		UserModule,
		AuthModule,
		BucketModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
