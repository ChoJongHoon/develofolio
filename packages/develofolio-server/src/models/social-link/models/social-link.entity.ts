import { Field, ObjectType } from '@nestjs/graphql'
import { Page } from 'src/models/page/models/page.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { SocialLinkType } from './social-link-type.enum'

@ObjectType()
@Entity({ name: 'social_links' })
export class SocialLink {
	@Field(() => String)
	@PrimaryColumn({ name: 'page_id', type: 'uuid' })
	pageId: string

	@Field(() => Page)
	@JoinColumn({ name: 'page_id' })
	@ManyToOne(() => Page, (page) => page.socialLinks, { onDelete: 'CASCADE' })
	page: Page

	@Field(() => SocialLinkType)
	@PrimaryColumn({ type: 'enum', enum: SocialLinkType })
	type: SocialLinkType

	@Field(() => String)
	@Column({ type: 'text' })
	link: string
}
