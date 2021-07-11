import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { Page } from 'src/models/page/models/page.entity'
import { ProviderType } from './enum/provider-type.enum'

@ObjectType()
@Entity({ name: 'users' })
export class User {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field(() => String)
	@Column({ type: 'text' })
	name: string

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', length: 255, nullable: true })
	email?: string

	@Field(() => String, { nullable: true })
	@Column({ type: 'text', nullable: true })
	avatar?: string | null

	@Field(() => ProviderType)
	@Column({ name: 'provider', type: 'enum', enum: ProviderType })
	provider: ProviderType

	@Field(() => String)
	@Column({ name: 'provider_id', type: 'varchar', length: 255 })
	providerId: string

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

	@Field(() => [Page])
	@OneToMany(() => Page, (page) => page.user, { cascade: ['remove'] })
	pages: Page[]
}
