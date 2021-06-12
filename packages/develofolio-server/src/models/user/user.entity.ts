import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ type: 'varchar', length: 255 })
	email: string

	@Column({ name: 'email_verified', type: 'timestamptz', nullable: true })
	emailVerified?: Date | null

	@Column({ type: 'text', nullable: true })
	image?: string | null

	@Column({ name: 'provider_type', type: 'varchar', length: 255 })
	providerType: string

	@Column({ name: 'provider_id', type: 'varchar', length: 255 })
	providerId: string

	@Column({ name: 'provider_account_id', type: 'varchar', length: 255 })
	providerAccountId: string

	@Column({ name: 'refresh_token', type: 'text', nullable: true })
	refreshToken?: string | null

	@Column({ name: 'access_token', type: 'text', nullable: true })
	accessToken?: string | null

	@Column({ name: 'access_token_expires', type: 'timestamptz', nullable: true })
	accessTokenExpires?: Date | null

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamptz',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date
}
