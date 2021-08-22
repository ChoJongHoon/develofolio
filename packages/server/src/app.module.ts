import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { PageModule } from './modules/page/page.module'
import { UserModule } from './modules/user/user.module'
import * as ormconifg from './config/ormconfig'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { githubConfig } from './config/github.config'
import { jwtConfig } from './config/jwt.config'
import { baseConfig } from './config/base.config'
import { FileModule } from './modules/file/file.module'
import { awsConfig } from './config/aws.config'
import { SchoolModule } from './modules/school/school.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [githubConfig, jwtConfig, baseConfig, awsConfig],
		}),
		TypeOrmModule.forRoot(ormconifg),
		GraphQLModule.forRootAsync({
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				autoSchemaFile:
					process.env.NODE_ENV === 'development' ? './schema.graphql' : true,
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
				introspection: true,
			}),
		}),
		UserModule,
		AuthModule,
		PageModule,
		FileModule,
		SchoolModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
