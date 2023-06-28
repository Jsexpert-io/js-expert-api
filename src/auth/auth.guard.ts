import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authenticationService: UserService,
  ) { }
  async canActivate(
    context: ExecutionContext,
  ) {
    try {
      const request = context.switchToHttp().getRequest()
      const { authorization } = request.headers


      if (!authorization) {
        throw new UnauthorizedException('You are not authorized')
      }
      const token = authorization.replace('Bearer ', '')

      const user = await this.authenticationService.verifyToken(token)
      if (!user) {
        throw new UnauthorizedException('You are not authorized')
      }
      if (!user) {
        return false
      }
      request.user = user

      return true;
    } catch (error) {
      if(error.message === 'jwt expired')
        throw new UnauthorizedException('The token is expired or invalid')
      else 
        throw new UnauthorizedException('You are not authorized')
    }

  }
}
