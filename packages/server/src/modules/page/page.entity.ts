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
import { User } from 'src/modules/user/user.entity'

@ObjectType()
@Entity({ name: 'pages' })
export class Page {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ name: 'user_id', type: 'uuid' })
	userId: string

	@Field(() => User)
	@OneToOne(() => User, (user) => user.page, { onDelete: 'CASCADE' })
	@JoinColumn({ name: 'user_id' })
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
