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
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
 
    
    if (!authorization) {
      throw new UnauthorizedException('You are not authorized')
    }
    const token = authorization.replace('Bearer ', '')
    const user = await this.authenticationService.verifyToken(token)
    if (!user) {
      return false
    }
    request.user = user

    return true;
  }
}
