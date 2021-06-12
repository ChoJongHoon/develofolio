import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserNameField1623480715807 implements MigrationInterface {
	name = 'AddUserNameField1623480715807'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" ADD "name" text NOT NULL`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`)
	}
}
