import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUsersTable1623476692069 implements MigrationInterface {
	name = 'CreateUsersTable1623476692069'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "email_verified" TIMESTAMP WITH TIME ZONE, "image" text, "provider_type" character varying(255) NOT NULL, "provider_id" character varying(255) NOT NULL, "provider_account_id" character varying(255) NOT NULL, "refresh_token" text, "access_token" text, "access_token_expires" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "users"`)
	}
}
