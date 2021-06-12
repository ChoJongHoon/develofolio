// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()
import { ConnectionOptions } from 'typeorm'

// You can load you .env file here synchronously using dotenv package (not installed here),
// import * as dotenv from 'dotenv';
// import * as fs from 'fs';
// const environment = process.env.NODE_ENV || 'development';
// const data: any = dotenv.parse(fs.readFileSync(`${environment}.env`));
// You can also make a singleton service that load and expose the .env file content.
// ...

// Check typeORM documentation for more information.
const config: ConnectionOptions = {
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	entities: [__dirname + '/**/*.entity{.ts,.js}'],

	// We are using migrations, synchronize should be set to false.
	synchronize: false,

	// Run migrations automatically,
	// you can disable this if you prefer running migration manually.
	migrationsRun: false,
	logging: true,
	logger: 'file',

	// Allow both start:prod and start:dev to use migrations
	// __dirname is either dist or src folder, meaning either
	// the compiled js in prod or the ts in dev.
	migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
	cli: {
		// Location of migration should be inside src folder
		// to be compiled into dist/ folder.
		migrationsDir: 'src/migrations',
	},
}

export = config
