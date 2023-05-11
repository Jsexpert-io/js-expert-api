import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Hash, createHash } from 'crypto';
import { SECRET_KEY, sendEmail } from 'src/Utils/EmailService';
import { DeveloperService } from 'src/developer/developer.service';
import { decode, sign, verify } from 'jsonwebtoken';


@Injectable()
export class AuthenticationService {
  async verifyToken(token: any) {
    const res = verify(token, SECRET_KEY)
    if (!res) {
      throw new UnauthorizedException('Invalid token')
    }
    const payload: any = decode(token)
    const user = await this.userService.findOneBy({ id: payload.id })
    if (user) {
      return user
    }
    throw new UnauthorizedException('Invalid token')
  }
  constructor(private userService: DeveloperService) { }
  async login({ email, password }: any) {
    const passwordHash = this.createInputHash(password)

    const user = await this.userService.findOneBy({
      email, password: passwordHash
    })
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email not verified')
    }

    const token = sign({
      id: user.id,
      email: user.email,


    }, SECRET_KEY, {
      expiresIn: '1d'
    })

    return { id: user.id, token, isEmailVerified: user.isEmailVerified }
  }
  async register({ email, password }: any) {
    const passwordHash = this.createInputHash(password)


    const isDuplicateUser = await this.userService.checkUserByEmail(email)
    console.log(isDuplicateUser);

    if (isDuplicateUser) {
      throw new UnauthorizedException('User already exists')
    }

    const user = await this.userService.create({ email, password: passwordHash, isEmailVerified: false })

    const emailToken = `${user.id}-${user._id}-${Date.now()}`;
    const emailTokenHash = this.createInputHash(emailToken)
    await this.userService.update(user.id, { emailToken: emailTokenHash })
    await sendEmail(email, 'Verify your email', 
    `<a href="${process.env.PUBLIC_API_URL}/authentication/verifyEmail?token=${emailTokenHash}">Click here to verify your email</a>`)
    return { id: user.id, isEmailVerified: user.isEmailVerified }
  }

  async verifyEmail(token: string) {
    const user = await this.userService.findOneBy({ emailToken: token })
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }
    await this.userService.update(user.id, { isEmailVerified: true })
    return {
      url: `${process.env.PUBLIC_APP_URL}/auth/login`
    }
  }
  // async googleLogin(req) {
  //   if (!req.user) {
  //     return 'No user from google'
  //   }
  //   const user = req.user;
  //   let dbUser: any = await this.userService.findByEmail(user.email)
  //   if (!dbUser) {
  //     dbUser = await this.userService.create(user)
  //   }

  //   return { url: `http://localhost:3000/auth/redirect?accessToken=${req.user.accessToken}&userId:${dbUser.id}` }
  // }

  createInputHash(input: string) {
    return createHash('sha256').update(input).digest('hex');
  }
}
