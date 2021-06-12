import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity({ name: 'users' })
export class User {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field(() => String)
	@Column({ type: 'text' })
	name: string

	@Field(() => String)
	@Column({ type: 'varchar', length: 255 })
	email: string

	@Field(() => String, { nullable: true })
	@Column({ type: 'text', nullable: true })
	avatar?: string | null

	@Field(() => String)
	@Column({ name: 'provider_id', type: 'varchar', length: 255 })
	providerId: string

	@Field(() => String)
	@Column({ name: 'provider_account_id', type: 'varchar', length: 255 })
	providerAccountId: string

	@Field(() => String, { nullable: true })
	@Column({ name: 'refresh_token', type: 'text', nullable: true })
	refreshToken?: string | null

	@Field(() => String, { nullable: true })
	@Column({ name: 'access_token', type: 'text', nullable: true })
	accessToken?: string | null

	@Field(() => Date, { nullable: true })
	@Column({ name: 'access_token_expires', type: 'timestamptz', nullable: true })
	accessTokenExpires?: Date | null

	@Field(() => Date)
	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date

	@Field(() => Date)
	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date
}
