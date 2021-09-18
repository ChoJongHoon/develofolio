import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddGoogleToProvider1631945557973 implements MigrationInterface {
	name = 'AddGoogleToProvider1631945557973'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TYPE "users_provider_enum" RENAME TO "users_provider_enum_old"`
		)
		await queryRunner.query(
			`CREATE TYPE "users_provider_enum" AS ENUM('GITHUB', 'FACEBOOK', 'GOOGLE')`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "provider" TYPE "users_provider_enum" USING "provider"::"text"::"users_provider_enum"`
		)
		await queryRunner.query(`DROP TYPE "users_provider_enum_old"`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "users_provider_enum_old" AS ENUM('GITHUB', 'FACEBOOK')`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "provider" TYPE "users_provider_enum_old" USING "provider"::"text"::"users_provider_enum_old"`
		)
		await queryRunner.query(`DROP TYPE "users_provider_enum"`)
		await queryRunner.query(
			`ALTER TYPE "users_provider_enum_old" RENAME TO "users_provider_enum"`
		)
	}
}
