import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import Strategy, { Profile } from 'passport-github'
import { User } from 'src/models/user/user.entity'
import { UserService } from 'src/models/user/user.service'
import { Repository } from 'typeorm'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
		private readonly userService: UserService
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

		const avatar = photos && photos.length > 0 ? photos[0].value : undefined

		let user = await this.userService.findByProvider('githubId', id)

		if (!user) {
			// const userId = uuid()
			// let src: string
			// if (avatar) {
			// 	const { filename } = await this.bucketService.syncProfileImage(
			// 		avatar,
			// 		userId
			// 	)
			// 	src = filename
			// }
			user = await this.userRepository.save({
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
