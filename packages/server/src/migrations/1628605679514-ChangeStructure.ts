import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeStructure1628605679514 implements MigrationInterface {
	name = 'ChangeStructure1628605679514'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "FK_98ceb5433a66707b9c649503dce"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8"`
		)
		await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "avatar"`)
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "UQ_98ceb5433a66707b9c649503dce"`
		)
		await queryRunner.query(`ALTER TABLE "pages" DROP COLUMN "user_id"`)
		await queryRunner.query(
			`ALTER TABLE "pages" ALTER COLUMN "content" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "page_id" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "page_id" DROP NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ALTER COLUMN "content" SET NOT NULL`
		)
		await queryRunner.query(`ALTER TABLE "pages" ADD "user_id" uuid NOT NULL`)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "UQ_98ceb5433a66707b9c649503dce" UNIQUE ("user_id")`
		)
		await queryRunner.query(`ALTER TABLE "pages" ADD "avatar" text`)
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "FK_98ceb5433a66707b9c649503dce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		)
	}
}
