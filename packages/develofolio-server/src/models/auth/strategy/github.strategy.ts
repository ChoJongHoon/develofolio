import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import Strategy, { Profile } from 'passport-github'
import { BucketService } from 'src/models/bucket/bucket.service'
import { User } from 'src/models/user/user.entity'
import { UserService } from 'src/models/user/user.service'
import { Repository } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private readonly userService: UserService,
		private readonly bucketService: BucketService
	) {
		super({
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: `${process.env.SERVER}/auth/github/redirect`,
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string,
		profile: Profile,
		done: (err: any, user: any, info?: any) => void
	) {
		const { id, photos, emails, displayName } = profile

		let avatar = photos && photos.length > 0 ? photos[0].value : undefined

		let user = await this.userService.findByProvider('github', id)

		if (!user) {
			const userId = uuid()

			if (avatar) {
				const { filename } = await this.bucketService.syncProfileImage(
					avatar,
					userId
				)
				avatar = filename
			}

			user = await this.userRepository.save({
				id: userId,
				accessToken,
				refreshToken,
				name: displayName,
				avatar,
				providerId: 'github',
				providerAccountId: id,
				email: emails?.[0].value,
			})
		}

		done(null, user)
	}
}
