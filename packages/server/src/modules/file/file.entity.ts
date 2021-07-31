import { Field, ObjectType } from '@nestjs/graphql'
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from '../user/user.entity'

@ObjectType()
@Entity({ name: 'files' })
export class File {
	@Field(() => String)
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Field(() => String, { nullable: true })
	@Column({ name: 'owner_id', type: 'uuid' })
	ownerId?: string

	@Field(() => User, { nullable: true })
	@ManyToOne(() => User, { nullable: true })
	@JoinColumn({ name: 'owner_id' })
	owner?: User

	@Field(() => String)
	@Column()
	key: string

	@Field(() => Boolean)
	@Column({ name: 'is_private', type: 'boolean', default: false })
	isPrivate: boolean
}
