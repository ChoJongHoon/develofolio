import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { GraphQLJSON } from 'graphql-type-json'
import { User } from '../user/user.entity'

@ObjectType()
@Entity({ name: 'pages' })
export class Page {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field(() => User)
	@OneToOne(() => User, (user) => user.page, { onDelete: 'CASCADE' })
	user: User

	@Field(() => GraphQLJSON, { nullable: true })
	@Column({ type: 'jsonb', nullable: true })
	content?: any | null

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', length: 255, unique: true, nullable: true })
	slug?: string | null

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', length: 255, nullable: true })
	title?: string | null

	@Field(() => String, { nullable: true })
	@Column({ type: 'varchar', length: 255, nullable: true })
	gtag?: string | null

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
