import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreatePagesTable1623502457042 implements MigrationInterface {
	name = 'CreatePagesTable1623502457042'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "pages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "content" jsonb NOT NULL, "avatar" text, "slug" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_fe7c6c521fc5ce106879192de96" PRIMARY KEY ("id", "slug"))`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "FK_98ceb5433a66707b9c649503dce" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "FK_98ceb5433a66707b9c649503dce"`
		)
		await queryRunner.query(`DROP TABLE "pages"`)
	}
}
