import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {}
