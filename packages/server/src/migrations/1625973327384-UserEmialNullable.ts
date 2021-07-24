import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserEmialNullable1625973327384 implements MigrationInterface {
	name = 'UserEmialNullable1625973327384'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL`
		)
	}
}
