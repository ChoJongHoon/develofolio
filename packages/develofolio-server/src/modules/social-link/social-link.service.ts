import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SocialLinkType } from './enum/social-link-type.enum'
import { SocialLink } from './social-link.entity'

@Injectable()
export class SocialLinkService {
	constructor(
		@InjectRepository(SocialLink)
		private socialLinkRepository: Repository<SocialLink>
	) {}

	async upsert(pageId: string, type: SocialLinkType, link: string) {
		return await this.socialLinkRepository.save({
			pageId,
			type,
			link,
		})
	}

	async delete(pageId: string, type: SocialLinkType) {
		return await this.socialLinkRepository.delete({ pageId, type })
	}

	async findByPageId(pageId: string) {
		return await this.socialLinkRepository.find({ where: { pageId } })
	}
}
