import { MigrationInterface, QueryRunner } from 'typeorm'

export class RemoveLegacyUserField1623485545430 implements MigrationInterface {
	name = 'RemoveLegacyUserField1623485545430'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email_verified"`)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "provider_type"`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ADD "provider_type" character varying(255) NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD "email_verified" TIMESTAMP WITH TIME ZONE`
		)
	}
}
