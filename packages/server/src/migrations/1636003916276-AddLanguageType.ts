import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddLanguageType1636003916276 implements MigrationInterface {
	name = 'AddLanguageType1636003916276'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "pages_language_enum" AS ENUM('KO', 'EN', 'ZH', 'JA', 'DE', 'FE', 'ES', 'RU')`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD "language" "pages_language_enum" NOT NULL DEFAULT 'KO'`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "language"`)
		await queryRunner.query(`DROP TYPE "pages_language_enum"`)
	}
}
