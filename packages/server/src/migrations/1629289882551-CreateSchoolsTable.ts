import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSchoolsTable1629289882551 implements MigrationInterface {
	name = 'CreateSchoolsTable1629289882551'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "schools" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "logo" character varying(255) NOT NULL, CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "schools"`)
	}
}
