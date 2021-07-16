import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'
import { config } from 'aws-sdk'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)

	app.enableCors({
		credentials: true,
		origin: configService.get('CLIENT_HOST'),
	})

	app.use(cookieParser())

	config.update({
		accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
		secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
		region: 'ap-northeast-2',
	})

	await app.listen(4000)
}
bootstrap()
