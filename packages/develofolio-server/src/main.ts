import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const configService = app.get(ConfigService)

	app.enableCors({
		credentials: true,
		origin: configService.get('CLIENT_HOST'),
	})

	app.use(cookieParser())

	await app.listen(4000)
}
bootstrap()
