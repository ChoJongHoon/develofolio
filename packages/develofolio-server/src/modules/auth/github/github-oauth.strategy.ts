import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github'
import { baseConfig } from 'src/config/base.config'
import { githubConfig } from 'src/config/github.config'
import { BucketService } from 'src/modules/bucket/bucket.service'
import { ProviderType } from 'src/modules/user/enum/provider-type.enum'
import { UserService } from 'src/modules/user/user.service'
import { v4 as uuid } from 'uuid'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(
		@Inject(githubConfig.KEY)
		githubEnv: ConfigType<typeof githubConfig>,
		@Inject(baseConfig.KEY)
		baseEnv: ConfigType<typeof baseConfig>,
		private readonly userService: UserService,
		private readonly bucketService: BucketService
	) {
		super({
			clientID: githubEnv.clientId,
			clientSecret: githubEnv.clientSecret,
			callbackURL: `${baseEnv.host}/auth/github/redirect`,
		})
	}

	async validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile
	) {
		const { id, photos, emails, displayName } = profile

		let avatar = photos && photos.length > 0 ? photos[0].value : undefined

		let user = await this.userService.findByProvider(ProviderType.GITHUB, id)

		if (!user) {
			const userId = uuid()

			if (avatar) {
				const { filename } = await this.bucketService.syncProfileImage(
					avatar,
					userId
				)
				avatar = filename
			}

			user = await this.userService.create({
				id: userId,
				name: displayName,
				email: emails?.[0].value,
				provider: ProviderType.GITHUB,
				providerId: id,
				avatar,
			})
		}

		return user
	}
}
