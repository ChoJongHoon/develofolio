import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFileTable1626444510117 implements MigrationInterface {
	name = 'CreateFileTable1626444510117'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "owner_id" uuid NOT NULL, "key" character varying NOT NULL, "is_private" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`
		)
		await queryRunner.query(
			`ALTER TABLE "files" ADD CONSTRAINT "FK_4bc1db1f4f34ec9415acd88afdb" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "files" DROP CONSTRAINT "FK_4bc1db1f4f34ec9415acd88afdb"`
		)
		await queryRunner.query(`DROP TABLE "files"`)
	}
}
