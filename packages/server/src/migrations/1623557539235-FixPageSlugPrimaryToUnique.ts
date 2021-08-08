import { MigrationInterface, QueryRunner } from 'typeorm'

export class FixPageSlugPrimaryToUnique1623557539235
	implements MigrationInterface
{
	name = 'FixPageSlugPrimaryToUnique1623557539235'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "PK_fe7c6c521fc5ce106879192de96"`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b" PRIMARY KEY ("id")`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "UQ_fe66ca6a86dc94233e5d7789535" UNIQUE ("slug")`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "UQ_fe66ca6a86dc94233e5d7789535"`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" DROP CONSTRAINT "PK_8f21ed625aa34c8391d636b7d3b"`
		)
		await queryRunner.query(
			`ALTER TABLE "pages" ADD CONSTRAINT "PK_fe7c6c521fc5ce106879192de96" PRIMARY KEY ("id", "slug")`
		)
	}
}
