import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserPageOneToOne1625980683676 implements MigrationInterface {
	name = 'UserPageOneToOne1625980683676'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "users" ADD "page_id" uuid`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "UQ_061b5b7deea3111c612ad67e7d8" UNIQUE ("page_id")`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "FK_98ceb5433a66707b9c649503dce"`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "UQ_98ceb5433a66707b9c649503dce" UNIQUE ("user_id")`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "FK_98ceb5433a66707b9c649503dce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "FK_98ceb5433a66707b9c649503dce"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8"`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "UQ_98ceb5433a66707b9c649503dce"`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "FK_98ceb5433a66707b9c649503dce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "UQ_061b5b7deea3111c612ad67e7d8"`
		)
		await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "page_id"`)
	}
}
