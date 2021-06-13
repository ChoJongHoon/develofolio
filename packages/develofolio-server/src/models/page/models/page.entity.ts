import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { GraphQLJSON } from 'graphql-type-json'
import { User } from 'src/models/user/user.entity'

@ObjectType()
@Entity({ name: 'pages' })
export class Page {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field(() => String)
	@Column({ name: 'user_id', type: 'uuid' })
	userId: string

	@Field(() => User)
	@JoinColumn({ name: 'user_id' })
	@ManyToOne(() => User, (user) => user.pages, { onDelete: 'CASCADE' })
	user: User

	@Field(() => GraphQLJSON)
	@Column({ type: 'jsonb' })
	content: any

	@Field(() => String, { nullable: true })
	@Column({ type: 'text', nullable: true })
	avatar?: string | null

	@Field(() => String)
	@Column({ type: 'varchar', length: 255, unique: true })
	slug: string

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
