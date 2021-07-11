import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { BucketModule } from './modules/bucket/bucket.module'
import { PageModule } from './modules/page/page.module'
import { SocialLinkModule } from './modules/social-link/social-link.module'
import { UserModule } from './modules/user/user.module'
import * as ormconifg from './config/ormconfig'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { githubConfig } from './config/github.config'
import { jwtConfig } from './config/jwt.config'
import { baseConfig } from './config/base.config'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [githubConfig, jwtConfig, baseConfig],
		}),
		TypeOrmModule.forRoot(ormconifg),
		GraphQLModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
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
					origin: configService.get('CLIENT_HOST'),
					credentials: true,
				},
			}),
		}),
		UserModule,
		AuthModule,
		BucketModule,
		PageModule,
		SocialLinkModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
