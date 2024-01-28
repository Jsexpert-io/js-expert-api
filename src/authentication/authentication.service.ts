import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash } from 'crypto';
import { decode, sign, verify } from 'jsonwebtoken';
import { SECRET_KEY, sendEmail } from 'src/Utils/EmailService';
import { DeveloperService } from 'src/developer/developer.service';


@Injectable()
export class AuthenticationService {
  async verifyToken(token: any) {
    const res = verify(token, SECRET_KEY)
    if (!res) {
      throw new UnauthorizedException('Invalid token')
    }
    const payload: any = decode(token)
    const user = await this.developerService.findOneBy({ id: payload.id })
    if (user) {
      return user
    }
    throw new UnauthorizedException('Invalid token')
  }
  constructor(private developerService: DeveloperService) { }
  async login({ email, password }: any) {
    const passwordHash = this.createInputHash(password)
    email = email.toLowerCase()
    const user = await this.developerService.findOneBy({
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

    return { user, token }
  }
  async register({ email, password }: any) {
    const passwordHash = this.createInputHash(password)
    email = email.toLowerCase()

    const isDuplicateUser = await this.developerService.checkUserByEmail(email)
    console.log(isDuplicateUser);

    if (isDuplicateUser) {
      throw new UnauthorizedException('User already exists')
    }

    const user = await this.developerService.create({ email, password: passwordHash, isEmailVerified: false })

    const emailToken = `${user.id}-${Date.now()}`;
    const emailTokenHash = this.createInputHash(emailToken)
    await this.developerService.update(user.id, { emailToken: emailTokenHash })
    await sendEmail(email, 'Verify your email',
      `<a href="${process.env.PUBLIC_API_URL}/authentication/verifyEmail?token=${emailTokenHash}">Click here to verify your email</a>`)
    return { id: user.id, isEmailVerified: user.isEmailVerified }
  }

  async verifyEmail(token: string) {
    const user = await this.developerService.findOneBy({ emailToken: token })
    if (!user) {
      throw new UnauthorizedException('Invalid token')
    }
    await this.developerService.update(user.id, { isEmailVerified: true })
    return {
      url: `${process.env.PUBLIC_APP_URL}/auth/login`
    }
  }
  // async googleLogin(req) {
  //   if (!req.user) {
  //     return 'No user from google'
  //   }
  //   const user = req.user;
  //   let dbUser: any = await this.developerService.findByEmail(user.email)
  //   if (!dbUser) {
  //     dbUser = await this.developerService.create(user)
  //   }

  //   return { url: `http://localhost:3000/auth/redirect?accessToken=${req.user.accessToken}&userId:${dbUser.id}` }
  // }

  createInputHash(input: string) {
    return createHash('sha256').update(input).digest('hex');
  }
}
