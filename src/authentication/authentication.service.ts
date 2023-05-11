import { Injectable } from '@nestjs/common';
import { DeveloperService } from 'src/developer/developer.service';



@Injectable()
export class AuthenticationService {
  constructor(private userService: DeveloperService) { }
  async googleLogin(req) {
    if (!req.user) {
      return 'No user from google'
    }
    const user = req.user;
    let dbUser = await this.userService.findByEmail(user.email)
    if (!dbUser) {
      dbUser = await this.userService.create(user)
    }

    return { url: `http://localhost:3000/auth/redirect?accessToken=${req.user.accessToken}&userId:${dbUser.id}` }
  }
}
