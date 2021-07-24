import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserPageOnDeleteSetNull1626443016900
	implements MigrationInterface
{
	name = 'UserPageOnDeleteSetNull1626443016900'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE SET NULL ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" DROP CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8"`
		)
		await queryRunner.query(
			`ALTER TABLE "users" ADD CONSTRAINT "FK_061b5b7deea3111c612ad67e7d8" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}
}
