import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPageColumns1629982011935 implements MigrationInterface {
	name = 'AddPageColumns1629982011935'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "pages" ADD "title" character varying(255)`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD "gtag" character varying(255)`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "gtag"`)
		await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "title"`)
	}
}
