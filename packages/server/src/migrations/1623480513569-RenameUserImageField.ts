import { MigrationInterface, QueryRunner } from 'typeorm'

export class RenameUserImageField1623480513569 implements MigrationInterface {
	name = 'RenameUserImageField1623480513569'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "image" TO "avatar"`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" RENAME COLUMN "avatar" TO "image"`
		)
	}
}
