import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@ObjectType()
@Entity({
	name: 'schools',
})
export class School {
	@Field(() => Int)
	@PrimaryGeneratedColumn('increment')
	id: string

	@Field(() => String)
	@Column({ type: 'varchar', length: 255 })
	name: string

	@Field(() => String)
	@Column({ type: 'varchar', length: 255 })
	logo: string
}
