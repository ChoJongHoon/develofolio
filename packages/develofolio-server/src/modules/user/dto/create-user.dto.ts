import { ProviderType } from '../enum/provider-type.enum'
import { User } from '../user.entity'

export class CreateUserDto implements Partial<User> {
	id?: string
	email?: string
	avatar?: string
	name: string
	provider: ProviderType
	providerId: string
}
