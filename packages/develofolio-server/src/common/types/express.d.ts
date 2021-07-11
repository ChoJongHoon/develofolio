import { User } from 'src/models/user/user.entity'

declare module 'express' {
	export interface Request {
		user?: User
	}
	export interface RequestWithAuth extends Request {
		user: User
	}
}
