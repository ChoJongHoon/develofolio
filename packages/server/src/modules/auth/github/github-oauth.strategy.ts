import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-github'
import { baseConfig } from '../../../config/base.config'
import { githubConfig } from '../../../config/github.config'
import { PageService } from '../../page/page.service'
import { ProviderType } from '../../user/enum/provider-type.enum'
import { UserService } from '../../user/user.service'

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
	constructor(
		@Inject(githubConfig.KEY)
		githubEnv: ConfigType<typeof githubConfig>,
		@Inject(baseConfig.KEY)
		baseEnv: ConfigType<typeof baseConfig>,
		private readonly userService: UserService,
		private readonly pageService: PageService
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
		console.log(`id`, id)
		const avatar = photos && photos.length > 0 ? photos[0].value : undefined

		let user = await this.userService.findByProvider(ProviderType.GITHUB, id)

		if (!user) {
			const page = await this.pageService.create()
			user = await this.userService.create({
				name: displayName,
				email: emails?.[0].value,
				pageId: page.id,
				provider: ProviderType.GITHUB,
				providerId: id,
				avatar,
			})
		}

		if (user.avatar !== avatar) {
			await this.userService.update(user.id, { avatar })
		}
		if (user.name !== displayName) {
			await this.userService.update(user.id, { name: displayName })
		}

		return user
	}
}
