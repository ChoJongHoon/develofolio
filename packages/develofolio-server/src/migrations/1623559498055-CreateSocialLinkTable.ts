import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSocialLinkTable1623559498055 implements MigrationInterface {
	name = 'CreateSocialLinkTable1623559498055'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TYPE "social_links_type_enum" AS ENUM('GITHUB', 'FACEBOOK', 'TWITTER', 'STACK_OVERFLOW')`
		)
		await queryRunner.query(
			`CREATE TABLE "social_links" ("page_id" uuid NOT NULL, "type" "social_links_type_enum" NOT NULL, "link" text NOT NULL, CONSTRAINT "PK_0a60595f8923ce9a907a1b65ae1" PRIMARY KEY ("page_id", "type"))`
		)
		await queryRunner.query(
			`ALTER TABLE "social_links" ADD CONSTRAINT "FK_2dcd48cd44d5414482374a4c49b" FOREIGN KEY ("page_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "social_links" DROP CONSTRAINT "FK_2dcd48cd44d5414482374a4c49b"`
		)
		await queryRunner.query(`DROP TABLE "social_links"`)
		await queryRunner.query(`DROP TYPE "social_links_type_enum"`)
	}
}
