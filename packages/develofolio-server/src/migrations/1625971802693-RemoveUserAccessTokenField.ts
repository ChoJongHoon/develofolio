import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveUserAccessTokenField1625971802693
	implements MigrationInterface
{
	name = 'RemoveUserAccessTokenField1625971802693'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "provider_account_id"`
		)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refresh_token"`)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "access_token"`)
		await queryRunner.query(
			`ALTER TABLE "users" DROP COLUMN "access_token_expires"`
		)
		await queryRunner.query(
			`CREATE TYPE "users_provider_enum" AS ENUM('GITHUB')`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "provider" "users_provider_enum" NOT NULL`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider"`)
		await queryRunner.query(`DROP TYPE "users_provider_enum"`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "access_token_expires" TIMESTAMP WITH TIME ZONE`
		)
		await queryRunner.query(`ALTER TABLE "users" ADD "access_token" text`)
		await queryRunner.query(`ALTER TABLE "users" ADD "refresh_token" text`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "provider_account_id" character varying(255) NOT NULL`
		)
	}
}
