import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authenticationService: AuthenticationService,
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers
    if (!authorization) {
      return false
    }
    const token = authorization.replace('Bearer ', '')
    const user = this.authenticationService.verifyToken(token)
    if (!user) {
      return false
    }
    request.user = user

    return true;
  }
}
