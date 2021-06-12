import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
	@Field(() => String)
	email: string

	@Field(() => Date, { nullable: true })
	emailVerified: Date | null

	@Field(() => String)
	avatar: string | null

	@Field(() => String)
	providerType: string

	@Field(() => String)
	providerId: string

	@Field(() => String)
	providerAccountId: string

	@Field(() => String, { nullable: true })
	refreshToken: string | null

	@Field(() => String, { nullable: true })
	accessToken: string | null

	@Field(() => Date, { nullable: true })
	accessTokenExpires: Date | null
}
